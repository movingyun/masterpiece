package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.UserLike;
import com.ssafy.backend.db.repository.UserLikeRepository;
import com.ssafy.backend.dto.LikeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class userLikeServiceImpl implements UserLikeService{

    @Autowired
    private UserLikeRepository userLikeRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private NFTService nftService;

    @Transactional
    @Override
    public void clickBoardLikes(LikeDto like) {
        // userWalletAddress로 user정보 가져오기
        String userWalletAddress = like.getUserWalletAddress();
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int userId = user.getId();

        // nftId로 nft정보 가져오기
        String nftHash = like.getNftHash();
        Nft nft = nftService.findByNFTHash(nftHash);

        //좋아요 누르기
        UserLike userLike = userLikeRepository.findByUserAndNftId(userId, nft.getId()).orElse(null);
        // userLike가 null값이면 행을 만들어주고
        if(userLike == null){
            userLike = UserLike.builder()
                    .id(0)
                    .user(user)
                    .nft(nft)
                    .isCancel(false)
                    .build();
        }else{
            // null이 아니면 isCancled를 바꿔준다.
            userLike.setCancel(!userLike.isCancel());
        }
        userLikeRepository.save(userLike);
    }

    @Transactional
    @Override
    public boolean isLike(LikeDto like) {
        // userWalletAddress로 user정보 가져오기
        String userWalletAddress = like.getUserWalletAddress();
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int userId = user.getId();

        // nftId로 nft정보 가져오기
        String nftHash = like.getNftHash();
        Nft nft = nftService.findByNFTHash(nftHash);

        //좋아요 확인하기
        UserLike userLike = userLikeRepository.findByUserAndNftId(userId, nft.getId()).orElse(null);
        boolean flag;
        // userLike가 null값이면 행을 만들어주고
        if(userLike == null){
            flag = false;
        }else{
            if(userLike.isCancel()){
                flag = false;
            }
            else{
                flag = true;
            }
        }
        return flag;
    }
}
