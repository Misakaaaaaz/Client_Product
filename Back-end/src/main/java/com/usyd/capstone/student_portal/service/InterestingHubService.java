package com.usyd.capstone.student_portal.service;

import com.usyd.capstone.student_portal.pojo.InterestingHubPost;
import com.usyd.capstone.student_portal.pojo.InterestingHubPostOperation;
import com.usyd.capstone.student_portal.pojo.PageBean;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface InterestingHubService {
    void createPost(InterestingHubPost interestingHubPost, List<MultipartFile> files);

//    List<InterestingHubPost> getAllPosts();
    PageBean getAllPosts(Integer page, Integer pageSize);

    InterestingHubPost getPostById(Integer postId);

    void recordOperation(InterestingHubPostOperation interestingHubPostOperation);
}
