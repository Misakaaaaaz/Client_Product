package com.usyd.capstone.student_portal.controller;

import com.usyd.capstone.student_portal.pojo.HelpButton;
import com.usyd.capstone.student_portal.pojo.Result;
import com.usyd.capstone.student_portal.service.HelpButtonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/student")
public class HelpButtonController {

    @Autowired
    private HelpButtonService helpButtonService;

    @PostMapping("/help")
    public Result applyHelp(@RequestBody HelpButton helpButton){
        log.info("Insert student's help application to DB", helpButton);
        helpButtonService.applyHelp(helpButton);
        return Result.success();
    }
}
