package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.InterestingHubPost;
import com.usyd.capstone.student_portal.pojo.InterestingHubPostImage;
import com.usyd.capstone.student_portal.pojo.InterestingHubPostOperation;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InterestingHubMapper {

    void insertPost(InterestingHubPost interestingHubPost);

    void insertPostImage(InterestingHubPostImage image);

    List<InterestingHubPost> selectAllPosts();

    InterestingHubPost selectPostById(Integer postId);

    void insertRecord(InterestingHubPostOperation interestingHubPostOperation);

    void updatePostClickNum(Integer postId);
}
