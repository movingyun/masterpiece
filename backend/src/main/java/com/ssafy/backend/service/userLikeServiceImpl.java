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
//        // userWalletAddress로 user정보 가져오기
//        String userWalletAddress = like.getUserWalletAddress();
//        User user = userService.findByUserWalletAddress(userWalletAddress);
//        int userId = user.getId();
//
//        // todo : nftAddress로 nft정보 가져오기
//        String nftAddress = like.getNftAddress();
//        Nft nft = nftService.findByNftAddress(nftAddress);
//        int nftId = nft.getId();
//
//        //좋아요 누르기
//        UserLike userLike = userLikeRepository.findByUserAndNftId(userId, nftId).orElse(null);
//        // userLike가 null값이면 행을 만들어주고
//        if(userLike == null){
//            userLike = UserLike.builder()
//                    .id(0)
//                    .user(user)
//                    .nft(nft)
//                    .isCancle(false)
//                    .build();
//        }else{
//            // null이 아니면 isCancled를 바꿔준다.
//            userLike.setCancle(!userLike.isCancle());
//        }
//        userLikeRepository.save(userLike);
    }
}
