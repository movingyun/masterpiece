package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
    public void deleteFile(String key_name);
    public String uploadProfileImage(User user, MultipartFile file);
    public String uploadNFTImage(Nft nft, MultipartFile file);
}
