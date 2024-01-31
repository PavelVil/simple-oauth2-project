package com.github.pavelvil.taskapp.service.impl;

import com.github.pavelvil.taskapp.entity.Task;
import com.github.pavelvil.taskapp.exception.TaskNotFoundException;
import com.github.pavelvil.taskapp.repository.TaskRepository;
import com.github.pavelvil.taskapp.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Task getById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found: ID: " + id));
    }

    @Override
    public List<Task> getByUserId(String userId) {
        return taskRepository.findAllByUserId(userId);
    }

    @Override
    public Task add(Task task) {
        task.setId(UUID.randomUUID().toString());
        return taskRepository.save(task);
    }

    @Override
    public Task update(Task task, String taskId) {
        Task taskForUpdate = getById(taskId);

        if (!task.getTitle().equals(taskForUpdate.getTitle())) {
            taskForUpdate.setTitle(task.getTitle());
        }
        if (!task.getDescription().equals(taskForUpdate.getDescription())) {
            taskForUpdate.setDescription(task.getDescription());
        }
        if (task.getCompleted() != taskForUpdate.getCompleted()) {
            taskForUpdate.setCompleted(task.getCompleted());
        }

        return taskRepository.save(taskForUpdate);
    }

    @Override
    public void deleteById(String id) {
        taskRepository.deleteById(id);
    }
}
