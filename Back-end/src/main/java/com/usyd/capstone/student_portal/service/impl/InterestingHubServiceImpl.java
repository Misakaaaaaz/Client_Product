package com.usyd.capstone.student_portal.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.usyd.capstone.student_portal.mapper.InterestingHubMapper;
import com.usyd.capstone.student_portal.pojo.InterestingHubPost;
import com.usyd.capstone.student_portal.pojo.InterestingHubPostImage;
import com.usyd.capstone.student_portal.pojo.InterestingHubPostOperation;
import com.usyd.capstone.student_portal.pojo.PageBean;
import com.usyd.capstone.student_portal.service.InterestingHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class InterestingHubServiceImpl implements InterestingHubService {
    @Autowired
    private InterestingHubMapper interestingHubMapper;
    private final String uploadDir = "src/main/resources/static/images/interesting_hub_post/";
    @Transactional
    @Override
    public void createPost(InterestingHubPost interestingHubPost, List<MultipartFile> files) {
        //1. save post info
        interestingHubPost.setCreatedAt(LocalDateTime.now());
        interestingHubMapper.insertPost(interestingHubPost);

        //2. If there has images
        if (files != null && !files.isEmpty()) {
            List<InterestingHubPostImage> images = new ArrayList<>();
            for (MultipartFile file : files) {
                try {
                    // use UUID to generate unique file name
                    String fileExtension = getFileExtension(file.getOriginalFilename());
                    String fileName = UUID.randomUUID().toString() + "." + fileExtension;

                    // save to certain directory
                    Path path = Paths.get(uploadDir + fileName);
                    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                    // image URL
                    String imageUrl = "/images/interesting_hub_post/" + fileName;

                    // PostImage Object
                    InterestingHubPostImage postImage = new InterestingHubPostImage();
                    postImage.setPostId(interestingHubPost.getPostId());
                    postImage.setImgUrl(imageUrl);
                    images.add(postImage);

                } catch (Exception e) {
                    throw new RuntimeException("File upload failed");
                }
            }

            // 3. 保存图片信息到数据库
            for (InterestingHubPostImage image : images) {
                interestingHubMapper.insertPostImage(image);
            }
        }
    }

//    @Override
//    public List<InterestingHubPost> getAllPosts() {
//        return interestingHubMapper.selectAllPosts();
//    }
    public PageBean getAllPosts(Integer page, Integer pageSize){
        PageHelper.startPage(page,pageSize);
        List<InterestingHubPost> postList = interestingHubMapper.selectAllPosts();
        Page<InterestingHubPost> p = (Page<InterestingHubPost>) postList;
        PageBean pageBean = new PageBean(p.getTotal(), p.getResult());
        return pageBean;
    }

    @Override
    public InterestingHubPost getPostById(Integer postId) {
        return interestingHubMapper.selectPostById(postId);
    }

    @Override
    public void recordOperation(InterestingHubPostOperation interestingHubPostOperation) {
        interestingHubPostOperation.setCreateAt(LocalDateTime.now());
        //插入新纪录
        interestingHubMapper.insertRecord(interestingHubPostOperation);
        // 更新帖子点击次数
        interestingHubMapper.updatePostClickNum(interestingHubPostOperation.getPostId());
    }

    // 帮助方法，用于获取文件扩展名
    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "";
    }
}
