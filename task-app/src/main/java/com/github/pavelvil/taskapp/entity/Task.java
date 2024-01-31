package com.github.pavelvil.taskapp.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Task {

    @Id
    private String id;

    private String title;

    private String description;

    private Boolean completed;

    private String userId;

}
