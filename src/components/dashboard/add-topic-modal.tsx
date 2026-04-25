"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { topicService } from "@/services/topic.service";
import type { CreateTopicInput, Topic } from "@/types";

interface AddTopicModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (topic: Topic) => void;
}

export const AddTopicModal = ({
  onClose,
  onCreated,
  open,
}: AddTopicModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateTopicInput>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      const topic = await topicService.createTopic(values);
      toast.success("Topic created successfully.");
      onCreated(topic);
      reset();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create topic.",
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Topic"
      description="Create a new track for your DSA sheet."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          label="Title"
          placeholder="Dynamic Programming"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Title must be at least 2 characters",
            },
          })}
        />
        <Textarea
          label="Description"
          placeholder="Short description for the topic"
          error={errors.description?.message}
          {...register("description")}
        />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create Topic
        </Button>
      </form>
    </Modal>
  );
};
