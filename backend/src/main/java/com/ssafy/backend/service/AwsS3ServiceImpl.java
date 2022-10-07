package com.ssafy.backend.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public String uploadProfileImage(User user, MultipartFile file) {
        String keyName = createKeyName(file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try(InputStream inputStream = file.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, keyName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
        String imagePath = amazonS3Client.getUrl(bucket, keyName).toString();
        user.setProfileImg(imagePath);

        return imagePath;
    }

    @Override
    @Transactional
    public String uploadNFTImage(Nft nft, MultipartFile file) throws IllegalArgumentException{
        String keyName = null;
        ObjectMetadata objectMetadata = null;
        try {
            keyName = createKeyName(file.getOriginalFilename());
            objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
        } catch(Exception e) {
            e.printStackTrace();
        }

        try(InputStream inputStream = file.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, keyName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
        String imagePath = amazonS3Client.getUrl(bucket, keyName).toString();
        nft.setImageUrl(imagePath);

        return imagePath;
    }

    @Override
    public void deleteFile(String keyName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, keyName));
    }

    private String createKeyName(String fileName){
        String ext = getFileExtension(fileName);
        if(ext == null)
            throw new IllegalArgumentException("No proper file extension");
        return UUID.randomUUID().toString().concat(ext);
    }
    private String getFileExtension(String fileName){
        try {
            //이미지 형식의 파일이 아니면 예외 발생
            String ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
            if(ext.equals(".gif") || ext.equals(".jpg") || ext.equals(".png") || ext.equals(".webm")) {
                return ext;
            }
            return null;
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}
