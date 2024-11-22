package com.usyd.capstone.student_portal.service.impl;

import com.usyd.capstone.student_portal.mapper.HelpButtonMapper;
import com.usyd.capstone.student_portal.pojo.HelpButton;
import com.usyd.capstone.student_portal.service.HelpButtonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class HelpButtonServiceImpl implements HelpButtonService {

    @Autowired
    private HelpButtonMapper helpButtonMapper;
    @Override
    public void applyHelp(HelpButton helpButton) {
        helpButton.setApplicationDate(LocalDate.now());
        helpButtonMapper.applyHelp(helpButton);
    }
}
