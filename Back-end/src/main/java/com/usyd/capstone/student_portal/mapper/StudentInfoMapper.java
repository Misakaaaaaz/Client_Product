package com.usyd.capstone.student_portal.mapper;

import com.usyd.capstone.student_portal.pojo.Student;
import com.usyd.capstone.student_portal.pojo.StudentInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;


@Mapper
public interface StudentInfoMapper {
    @Insert("INSERT INTO student(student_password, student_email) " +
            "VALUES (#{studentPassword}, #{studentEmail})")
    void registerStudent(Student student);

    @Select("SELECT * FROM student WHERE student_email = #{email}")
    Student findStudentByEmail(String email);

    @Update("UPDATE student SET student_password = #{password} WHERE student_email = #{email}")
    void updatePassword(@Param("email") String email, @Param("password") String password);

    @Select("SELECT foe_code, foe_name, ranking, salary_median FROM student_career_info WHERE student_id = #{studentId}")
    List<Map<String, Object>> findCareerInfoByStudentId(@Param("studentId") Integer studentId);

    @Select("SELECT career_1, career_2, career_3, career_4, career_5, salary_min, salary_q1, salary_median, salary_q3, salary_max " +
            "FROM student_career_info WHERE student_id = #{studentId} AND foe_code = #{foeCode}")
    Map<String, Object> findCareersByUserIdAndFoeCode(@Param("studentId") Integer studentId, @Param("foeCode") String foeCode);

    @Select("SELECT university, course, duration_weeks, course_cost, atar_min_non_adj, atar_med_non_adj, atar_guaranteed, admission_center, admission_center_code, target_or_reach " +
            "FROM student_university_info WHERE student_id = #{studentId} AND foe_code = #{foeCode}")
    List<Map<String, Object>> findUniversityAndCourseByStudentIdAndFoeCode(@Param("studentId") Integer studentId, @Param("foeCode") String foeCode);

    @Select("SELECT s.student_id, s.student_email, sa.surname_initial, sa.age, sa.first_name, sa.middle_name," +
            "sa.last_name, sa.country_born, sa.current_country, sa.current_city " +
            "FROM student s " +
            "JOIN section0_answer sa ON s.student_id = sa.student_id " +
            "WHERE s.student_id = #{studentId}")
    StudentInfo findStudentInfoById(Integer studentId);
}
