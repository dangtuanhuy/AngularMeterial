import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../model/Exercise.model';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class TrainingService {
    exerciesChanged = new Subject<Exercise>();
    availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees-Huy', duration: 60, calories: 8 }
    ];
    private runningExercies: Exercise;
    private exercises: Exercise[] = [];
    getAvailableExercises() {
        return this.availableExercises.slice();
    }
    startExercies(selectedId: string) {
        this.runningExercies = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciesChanged.next({ ...this.runningExercies });
    }
    completeExercise() {
        this.exercises.push({
            ...this.runningExercies,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercies = null;
        this.exerciesChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercies,
            duration: this.runningExercies.duration * (progress / 100),
            calories: this.runningExercies.duration * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercies = null;
        this.exerciesChanged.next(null);
    }
    getRunningExercise() {
        return { ...this.runningExercies };
    }
    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
      }
}
