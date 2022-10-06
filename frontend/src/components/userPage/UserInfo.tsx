import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Card, CardContent, Tooltip, Button, TextField, FormControl } from '@mui/material';
import { Instance } from '@popperjs/core';
import { editUser, fetchTicket, fetchUser } from '../../_slice/UserSlice';
import useCopyClipBoard from '../../_hook/useCopyClipBoard';
// eslint-disable-next-line import/no-named-as-default
import NFTPreview from '../../commons/NFTPreview';

const ALLOW_FILE_EXTENSION = 'jpg,jpeg,png';
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

const StyledCardList = styled.div`
  margin: 20px 0 10px;
  display: flex;
  > * {
    margin: 2px;
  }
`;
const StyledWord = styled.div`
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
`;
const StyledName = styled.div`
  margin: 0 0 20px 20px;
  font-weight: 800;
  font-size: 24px;
`;

const StyledBtn = styled.div`
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
`;

const StyledCopyWallet = styled.div`
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export interface UserInfoType {
  walletAddress: string;
}
export default function UserInfo({ walletAddress }: UserInfoType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(walletAddress));
  }, []);

  const searchedUser = useSelector((state: any) => state.user.searchedUser);
  const currentUser = useSelector((state: any) => state.user.currentUser);

  // 정보 수정
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState(searchedUser.nickname);
  const [message, setMessage] = useState(searchedUser.message);
  const [file, setFile] = useState<any>();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setNickname(searchedUser.nickname);
    setMessage(searchedUser.message);
  }, [searchedUser]);

  // 파일 업로드
  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    }

    // 파일 확장자 체크
    if (!fileExtensionValid(files)) {
      target.value = '';
      alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`);
      return;
    }

    // 파일 용량 체크
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    // validation을 정상적으로 통과한 File
    setFile(files);
    encodeFileToBase64(files);
    console.log(files);
  };

  const fileExtensionValid = ({ name }: { name: string }): boolean => {
    // 파일 확장자
    const extension = removeFileName(name);

    if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
      return false;
    }
    return true;
  };

  const removeFileName = (originalFileName: string): string => {
    const lastIndex = originalFileName.lastIndexOf('.');

    if (lastIndex < 0) {
      return '';
    }

    return originalFileName.substring(lastIndex + 1).toLowerCase();
  };

  // 파일 미리보기
  const encodeFileToBase64 = (fileBlob: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise(resolve => {
      reader.onload = () => {
        const resultA = `${reader.result}`;
        setImageSrc(resultA);

        resolve(imageSrc);
      };
    });
  };

  // 클릭 시 지갑주소 복사

  const [isCopy, onCopy] = useCopyClipBoard();

  const handleCopy = (text: string) => {
    onCopy(text);
  };

  // 툴팁
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  const editHander = async () => {
    if (isEdit) {
      console.log(walletAddress);
      console.log(nickname);
      console.log(message);

      const formData = new FormData();
      formData.append('wallet_address', walletAddress);
      formData.append('profileImage', file);
      formData.append('nickname', nickname);
      formData.append('message', message);

      await dispatch(editUser(formData));
      await dispatch(fetchUser(walletAddress));
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <StyledCardList>
      {isEdit ? (
        // 정보 수정
        <>
          <Card sx={{ width: '30%', minWidth: 200 }}>
            <h1>프로필 변경</h1>
            <input type="file" onChange={fileUploadValidHandler} />
            {file ? imageSrc && <NFTPreview url={imageSrc} /> : <NFTPreview url={`${searchedUser.profileImage}`} />}
          </Card>
          <Card sx={{ width: '70%' }}>
            <StyledBtn>
              {currentUser.walletAddress === searchedUser.walletAddress ? (
                <Button onClick={editHander}>Done</Button>
              ) : null}
            </StyledBtn>
            <CardContent>
              <TextField
                fullWidth
                required
                label="Nickname"
                variant="outlined"
                defaultValue={searchedUser.nickname}
                onChange={onChangeNickname}
              />
              <StyledWord>Wallet Address : {searchedUser.wallet_address} </StyledWord>
              <StyledWord>Joined : {searchedUser.joinDate}</StyledWord>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                defaultValue={searchedUser.message}
                onChange={onChangeMessage}
              />
            </CardContent>
          </Card>
        </>
      ) : (
        // 정보 출력
        <>
          <Card sx={{ width: '30%', minWidth: 200 }}>
            <NFTPreview url={`${searchedUser.profileImage}`} />
          </Card>
          <Card sx={{ width: '70%' }}>
            <StyledBtn>
              {currentUser.walletAddress === searchedUser.walletAddress ? (
                <Button onClick={editHander}>Edit</Button>
              ) : null}
            </StyledBtn>
            <CardContent>
              <StyledName>{searchedUser.nickname}</StyledName>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <Tooltip
                title="Copy"
                arrow
                placement="top"
                PopperProps={{
                  popperRef,
                  anchorEl: {
                    getBoundingClientRect: () =>
                      new DOMRect(positionRef.current.x, areaRef.current!.getBoundingClientRect().y, 0, 0),
                  },
                }}>
                <StyledCopyWallet
                  onClick={() => {
                    handleCopy(`${searchedUser.wallet_address}`);
                  }}
                  tabIndex={0}
                  role="button"
                  ref={areaRef}
                  onMouseMove={handleMouseMove}>
                  <strong>Wallet Address : </strong>
                  {searchedUser.wallet_address}
                </StyledCopyWallet>
              </Tooltip>
              <StyledWord>
                <strong>Joined : </strong>
                {searchedUser.joinDate}
              </StyledWord>
              <StyledWord>{searchedUser.message}</StyledWord>
            </CardContent>
          </Card>
        </>
      )}
    </StyledCardList>
  );
}
