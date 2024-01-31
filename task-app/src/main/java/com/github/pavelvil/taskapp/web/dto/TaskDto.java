package com.github.pavelvil.taskapp.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TaskDto {

    private String id;

    private String title;

    private String description;

    private Boolean completed;

    private String userId;

}
