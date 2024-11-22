package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.InterestingHubPost;
import com.usyd.capstone.student_portal.pojo.InterestingHubPostOperation;
import com.usyd.capstone.student_portal.pojo.PageBean;
import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.service.InterestingHubService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/student/interesting-hub")
public class InterestingHubController {
    @Autowired
    private InterestingHubService interestingHubService;
    @PostMapping("/post")
    public Result createPost(
            @RequestParam("title") String title,
            @RequestParam("context") String context,
            @RequestParam("foeId") Integer foeId,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        InterestingHubPost interestingHubPost = new InterestingHubPost();
        interestingHubPost.setTitle(title);
        interestingHubPost.setContext(context);
        interestingHubPost.setFoeId(foeId);
        log.info("Insert post to DB", interestingHubPost);
        interestingHubService.createPost(interestingHubPost, files != null ? files : new ArrayList<>());
        return Result.success();
    }
    // 查询所有帖子
    @GetMapping("/post")
    public Result getAllPosts(
            @RequestParam(defaultValue = "1")Integer page,
            @RequestParam(defaultValue = "9")Integer pageSize
    ) {
//        List<InterestingHubPost> posts = interestingHubService.getAllPosts();
        PageBean pageBean = interestingHubService.getAllPosts(page, pageSize);
        return Result.success(pageBean);
    }

    //按照ID查询单个帖子
    @GetMapping("/post/{postId}")
    public Result getPostById(@PathVariable("postId") Integer postId){
        InterestingHubPost interestingHubPost = interestingHubService.getPostById(postId);
        return  Result.success(interestingHubPost);
    }

    @PostMapping("/operation")
    public Result recordOperation(@RequestBody InterestingHubPostOperation interestingHubPostOperation){
        interestingHubService.recordOperation(interestingHubPostOperation);
        return Result.success();
    }

}
