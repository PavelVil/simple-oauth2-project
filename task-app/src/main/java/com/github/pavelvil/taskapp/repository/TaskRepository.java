package com.github.pavelvil.taskapp.repository;

import com.github.pavelvil.taskapp.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findAllByUserId(String userId);

}
