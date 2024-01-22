"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendEmailAndMessageToSlack } from "@/api/slack";

const formSchema = z.object({
  projectName: z.string().min(1, {
    message: "Project Name is required",
  }),
  endpoint: z.string().min(1, {
    message: "Service Endpoint is required",
  }),
});

export default function ProjectCreateForm(props: {
  email: string;
  callback: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      endpoint: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendEmailAndMessageToSlack(props.email, JSON.stringify(values, null, 2));
    form.reset();
    props.callback();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 py-8 sm:w-[50rem]"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the project name (Sample Project)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the endpoint of your service (https://api.example.com/health)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {`We'll send GET requests to the endpoint to check the status of your service.`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div />
        <Button className="w-full" type="submit">
          Create Project
        </Button>
      </form>
    </Form>
  );
}
