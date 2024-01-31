package com.github.pavelvil.taskapp.service;

import com.github.pavelvil.taskapp.entity.Task;

import java.util.List;

public interface TaskService {

    Task getById(String id);

    List<Task> getByUserId(String userId);

    Task add(Task task);

    Task update(Task task, String taskId);

    void deleteById(String id);

}
