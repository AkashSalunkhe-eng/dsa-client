"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { problemService } from "@/services/problem.service";
import type { CreateProblemInput, Problem } from "@/types";

interface AddProblemModalProps {
  open: boolean;
  topicId: string;
  onClose: () => void;
  onCreated: (problem: Problem) => void;
}

export const AddProblemModal = ({
  onClose,
  onCreated,
  open,
  topicId,
}: AddProblemModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateProblemInput>({
    defaultValues: {
      topicId,
      title: "",
      difficulty: "EASY",
      articleUrl: "",
      leetcodeUrl: "",
      youtubeUrl: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      const problem = await problemService.createProblem({
        ...values,
        topicId,
      });
      toast.success("Problem added successfully.");
      onCreated(problem);
      reset({
        topicId,
        title: "",
        difficulty: "EASY",
        articleUrl: "",
        leetcodeUrl: "",
        youtubeUrl: "",
      });
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create problem.",
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Problem"
      description="Add a new problem reference under this topic."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          label="Title"
          placeholder="Longest Increasing Subsequence"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
          })}
        />
        <Select
          label="Difficulty"
          error={errors.difficulty?.message}
          {...register("difficulty", {
            required: "Difficulty is required",
          })}
        >
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </Select>
        <Input label="LeetCode URL" placeholder="https://leetcode.com/..." {...register("leetcodeUrl")} />
        <Input label="Article URL" placeholder="https://example.com/article" {...register("articleUrl")} />
        <Input label="YouTube URL" placeholder="https://youtube.com/watch?v=..." {...register("youtubeUrl")} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Add Problem
        </Button>
      </form>
    </Modal>
  );
};
