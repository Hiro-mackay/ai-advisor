import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { MeetingType } from "../../servers/schema/query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateMeetingSchema,
  CreateMeetingType,
} from "../../servers/schema/mutation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AgentType } from "@/feature/agents/server/schema/query";
import { AgentAvatar } from "@/components/avatar/agent";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Combobox } from "@/components/combobox";

type Props = {
  onSuccess?: (meeting: MeetingType) => void;
  onCancel?: () => void;
  defaultValues?: Partial<MeetingType>;
  options: {
    loading: boolean;
    agents: AgentType[];
  };
};

export function MeetingForm({
  options,
  onCancel,
  defaultValues,
  onSuccess,
}: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: trpc.meetings.getAll.queryKey(),
        });
        onSuccess?.(data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<CreateMeetingType>({
    resolver: zodResolver(CreateMeetingSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (isEditable) {
      //   updateMeeting.mutate(data);
    } else {
      createMeeting.mutate(data);
    }
  });

  const isEditable = !!defaultValues?.id;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agents</FormLabel>
              <FormControl>
                <Combobox
                  defaultValue={field.value}
                  placeholder="Select an agent"
                  emptyMessage="No agents found."
                  options={options.agents.map((agent) => ({
                    value: agent.id,
                    label: (
                      <div className="flex items-center gap-2">
                        <AgentAvatar agent={agent} size={20} />
                        {agent.name}
                      </div>
                    ),
                  }))}
                  onSelect={(value) => {
                    form.setValue("agentId", value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{isEditable ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Form>
  );
}
