import { useEffect, useState } from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LicenseTypes } from "@/constants";
import { useStore } from "@/store/store";
import { Textarea } from "./ui/textarea";
import { getStationsByCity } from "@/action/station.action";
import { submitLicenseApplication } from "@/action/citizen.action";
import { LicenseType } from "@prisma/client";
import { useToast } from "./ui/use-toast";

export const LicenseModal = () => {
  const [data, setData] = useState<{ licenseType: LicenseType; reason: string }>({
    licenseType: "Firearm",
    reason: "",
  });
  const user = useStore(state => state.user)
  const [open, setOpen] = useState(false);
  const [openPS, setOpenPS] = useState(false);
  const setLicenseModal = useStore((state) => state.setLicenseModal);
  const [stations, setStations] = useState<
  Array<{ stationName: string; id: string }>
>([])

const [assignedStation, setAssignedStation] = useState("")
const { toast } = useToast()

useEffect(() => {
  (async () => {
    const stns = await getStationsByCity(
      user?.address?.[0].city || ""
    );
    if (!stns || stns.length == 0) return
    console.log(stns)
    setStations(stns);
    setAssignedStation(stns[0].id)
  })();
}, [])

  const handleSubmit = async () => {
    const response = await submitLicenseApplication({ assignedStationId: assignedStation, licenseType: data.licenseType, reason: data.reason, userId: user?.id || "" })
    if(response) toast({ title: "Application Submitted Successfully!", description: "The officials will soon connect to you regarding further procedings" })
    else toast({ title: "Something went wrong!", description: "Please try again later!" })
    setLicenseModal()
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-black backdrop-blur-sm bg-opacity-30 z-20 fixed top-0 left-0 flex items-center justify-center">
      <div className=" bg-white relative w-[40%] animate-appear-up h-[60%] p-4 px-10 rounded-xl shadow-lg flex flex-col items-center justify-start gap-4">

        <X onClick={setLicenseModal} className=" absolute top-4 right-4 cursor-pointer text-gray-500 hover:bg-gray-200" />

        <h1 className="font-bold text-xl">Apply For License</h1>

        <div className=" self-start flex items-center justify-between w-full">
          <span>License Type: </span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between self-start"
              >
                {data?.licenseType
                  ? LicenseTypes.find(
                      (license) => license === data.licenseType
                    )?.replace("_", " ")
                  : "Select framework..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search License..." />
                <CommandList>
                  <CommandEmpty>No License found.</CommandEmpty>
                  <CommandGroup>
                    {LicenseTypes.map((license) => (
                      <CommandItem
                        key={license}
                        value={license}
                        onSelect={(currentValue) => {
                          // setValue(currentValue === value ? "" : currentValue)
                          setData((prev) => ({
                            licenseType: currentValue as LicenseType,
                            reason: prev?.reason || "",
                          }));
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            data?.licenseType === license
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {license.replace("_", " ")}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>



        <div className=" self-start flex items-center justify-between w-full">
          <span>Police Station: </span>
          <Popover open={openPS} onOpenChange={setOpenPS}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPS}
                className="w-[200px] justify-between self-start"
              >
                {assignedStation
                  ? stations.find(
                      (station) => station.id === assignedStation
                    )?.stationName.replace("_", " ")
                  : "Select Station"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Station..." />
                <CommandList>
                  <CommandEmpty>No Station found.</CommandEmpty>
                  <CommandGroup>
                    {stations.map((station) => (
                      <CommandItem
                        key={station.id}
                        value={station.id}
                        onSelect={(currentValue) => {
                          // setValue(currentValue === value ? "" : currentValue)
                          setAssignedStation(currentValue)
                          setOpenPS(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            assignedStation === station.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {station.stationName.replace("_", " ")}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>


        <div className="w-full">
          <span>Reason: </span>
          <Textarea
            value={data.reason}
            className=" resize-none w-full h-40"
            onChange={(e) =>
              setData({ licenseType: data.licenseType, reason: e.target.value })
            }
          />
        </div>

        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
