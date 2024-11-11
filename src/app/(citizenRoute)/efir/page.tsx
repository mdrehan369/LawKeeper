"use client";

import { Container } from "@/components/Container";
import { useStore } from "@/store/store";
import { Address, OffenceType, Suspect } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cognizable_offenses } from "@/constants";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { getStationsByCity } from "@/action/station.action";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

function Divider(props: { label: string }) {
  return (
    <div className="w-full flex items-center justify-start gap-2">
      <span className=" w-fit text-gray-400 text-sm uppercase font-medium">
        {props.label}
      </span>
      <div className=" flex-grow h-[2px] bg-gray-300 rounded-full"></div>
    </div>
  );
}

const FormElem = ({
  form,
  name,
  label,
  placeHolder,
  description,
  options,
}: {
  form: any;
  name: string;
  description?: string;
  label: string;
  placeHolder: string;
  options?: object;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeHolder}
              {...options}
              className="w-full"
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function Efir(props: Props) {
  const user = useStore((state) => state.user);

  const formSchema = z.object({
    userId: z.string().min(2),
    incidentTime: z.date(),
    victim: z.string().min(1),
    phoneNumber: z.string().min(10),
    fullName: z.string().min(1),
    address: Address,
    description: z.string().min(2),
    offence: z.string().min(2),
    assignedStationId: z.string().min(2),
    suspects: z.array(Suspect),
  });

  const [stations, setStations] = useState<
    Array<{ stationName: string; id: string }>
  >([]);

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user?.id,
      phoneNumber: user?.phoneNumber,
      fullName: user?.fullName,
      suspects: [],
    },
  });

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
        toast({ title: "Submitting...", description: "Please wait..." })
        await axios.post("/api/v1/efir", values)
        router.push("/")
        toast({ title: "E-FIR Submitted successfully!", description: "The officials wil get in touch with you soon..." })
    } catch (error) {
        console.log(error)
        toast({ title: "Something went wrong!", description: "Please try again later...", variant: "destructive" })
    } finally {
        
    }
  };

  useEffect(() => {
    (async () => {
      if (user?.address?.[0].city) return;
      const stns = await getStationsByCity(
        user?.address?.[0].city || form.watch("address.city") || ""
      );
      if (stns) setStations(stns);
    })();
  }, [form.watch("address.city")]);

  return (
    <Container className="flex flex-col h-auto items-center justify-start py-20">
      <h1 className="text-xl font-bold">E-FIR</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[70%] h-auto mb-10"
        >
          <Divider label="Case Details" />
          <div className="w-full">
            <div className="w-full flex items-center justify-center gap-5">
              <FormElem
                name="fullName"
                label="Full Name"
                form={form}
                placeHolder=""
                options={{ disabled: true }}
              />

              <FormElem
                name="phoneNumber"
                label="Phone Number"
                form={form}
                placeHolder=""
                options={{ disabled: true }}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              <FormElem
                name="address.country"
                form={form}
                placeHolder=""
                label="Country"
              />
              <FormElem
                name="address.state"
                form={form}
                placeHolder=""
                label="State"
              />
              <FormElem
                name="address.city"
                form={form}
                placeHolder=""
                label="City"
              />
              <FormElem
                name="address.postalCode"
                form={form}
                placeHolder=""
                label="Postal Code"
              />
              <FormElem
                name="address.landmark"
                form={form}
                placeHolder=""
                label="Landmark"
              />
              <FormElem
                name="address.street"
                form={form}
                placeHolder=""
                label="Street"
              />
              <FormElem
                name="address.houseNumber"
                form={form}
                placeHolder=""
                label="House Number"
              />

              <FormField
                control={form.control}
                name="assignedStationId"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full h-full mt-2">
                    <FormLabel>Police Station</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? stations.find(
                                  (station) => station.id === field.value
                                )?.stationName
                              : "Select station"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full pt-0">
                        <Command>
                          <CommandInput placeholder="Search station..." />
                          <CommandList>
                            <CommandEmpty>No station found.</CommandEmpty>
                            <CommandGroup>
                              {stations.map((station) => (
                                <CommandItem
                                  value={station.id}
                                  key={station.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "assignedStationId",
                                      station.id
                                    );
                                  }}
                                >
                                  {station.stationName}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      station.stationName === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-center gap-6">
              <FormField
                control={form.control}
                name="incidentTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Case Date And Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormElem
                name="victim"
                label="Victim"
                form={form}
                placeHolder=""
              />

              <FormField
                control={form.control}
                name="offence"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full h-full mt-2">
                    <FormLabel>Offence</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? cognizable_offenses.find(
                                  (offence) => offence.offense === field.value
                                )?.offense
                              : "Select station"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full pt-0">
                        <Command>
                          <CommandInput placeholder="Search station..." />
                          <CommandList>
                            <CommandEmpty>No offence found.</CommandEmpty>
                            <CommandGroup>
                              {cognizable_offenses.map((offence) => (
                                <CommandItem
                                  value={offence.offense}
                                  key={offence.offense}
                                  onSelect={() => {
                                    form.setValue("offence", offence.offense);
                                  }}
                                >
                                  {offence.offense + " | " + offence.section}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      offence.offense === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about the case"
                      className="resize-none h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Divider label="Suspects" />

          <div className="flex flex-col items-center gap-3">
            {form.watch("suspects").map((suspect, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-center gap-3"
              >
                <FormElem
                  name={`suspects[${index}].name`}
                  label="Name"
                  form={form}
                  placeHolder=""
                />
                <FormElem
                  name={`suspects[${index}].description`}
                  label="Description"
                  form={form}
                  placeHolder=""
                />
                <FormElem
                  name={`suspects[${index}].reason`}
                  label="Reason"
                  form={form}
                  placeHolder=""
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                form.setValue("suspects", [
                  ...form.watch("suspects"),
                  { name: "", description: "", reason: "" },
                ])
              }
            >
              {" "}
              <Plus className="mr-1" /> Add Suspect
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
}
