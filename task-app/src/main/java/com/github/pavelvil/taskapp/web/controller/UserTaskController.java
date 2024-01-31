package com.github.pavelvil.taskapp.web.controller;

import com.github.pavelvil.taskapp.exception.InvalidOperationException;
import com.github.pavelvil.taskapp.mapper.TaskMapper;
import com.github.pavelvil.taskapp.service.TaskService;
import com.github.pavelvil.taskapp.web.dto.TaskDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
public class UserTaskController {

    private final TaskService taskService;

    private final TaskMapper taskMapper;

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<TaskDto>> getTasksForUser(JwtAuthenticationToken principal) {
        return ResponseEntity.ok(taskMapper.toDtoList(taskService.getByUserId(principal.getName())));
    }

    @GetMapping("/{taskId}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<TaskDto> getTaskForUser(JwtAuthenticationToken principal, @PathVariable String taskId) {
        canWorkWithTask(taskId, principal.getName());

        return ResponseEntity.ok(taskMapper.toDto(taskService.getById(taskId)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto task) {
        var newTask = taskService.add(taskMapper.toEntity(task));

        return ResponseEntity.status(HttpStatus.CREATED).body(taskMapper.toDto(newTask));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<TaskDto> updateTask(JwtAuthenticationToken principal,
                                              @RequestBody TaskDto task,
                                              @PathVariable String id) {
        canWorkWithTask(id, principal.getName());

        var updatedTask = taskService.update(taskMapper.toEntity(task), id);

        return ResponseEntity.ok(taskMapper.toDto(updatedTask));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteById(Principal principal, @PathVariable String id) {
        canWorkWithTask(id, principal.getName());

        taskService.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    private void canWorkWithTask(String taskId, String userId) {
        var task = taskService.getById((taskId));
        if (!task.getUserId().equals(userId)) {
            throw new InvalidOperationException("User with ID " + userId + " can't change task with id " + taskId);
        }
    }

}
