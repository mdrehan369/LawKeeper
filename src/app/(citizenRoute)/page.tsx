"use client"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import Image from "next/image"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { CardBuilder } from "@/components/CardBuilder"
import { findNearestPoliceStation } from "@/action/citizen.action"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

import { searchAreas } from "@/constants"
import axios from "axios"
import { useStore } from "@/store/store"
import { LicenseModal } from "@/components/LicenceModal"
import { Address, Document } from "@/zod"

type props = {}

function SearchByArea({ area, setArea, value, setValue }: { area: "zone" | "city" | "state", setArea: any, value: string, setValue: any }) {


  const [open, setOpen] = useState(false)

  return (
    <>
      <RadioGroup defaultValue="zone" className="flex items-center justify-start gap-4 mb-6">
        <div className="flex items-center space-x-2" onClick={() => setArea("zone")}>
          <RadioGroupItem value="zone" id="option-one" />
          <Label htmlFor="option-one">Zone</Label>
        </div>
        {/* <div className="flex items-center space-x-2">
          <RadioGroupItem value="range" id="option-two" />
          <Label htmlFor="option-two">Range</Label>
        </div> */}
        <div className="flex items-center space-x-2" onClick={() => setArea("city")}>
          <RadioGroupItem value="city" id="option-three" />
          <Label htmlFor="option-three">City</Label>
        </div>
        <div className="flex items-center space-x-2" onClick={() => setArea("state")}>
          <RadioGroupItem value="state" id="option-four" />
          <Label htmlFor="option-four">State</Label>
        </div>
      </RadioGroup>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            onClick={() => setOpen(true)}
          >
            {value
              // ? frameworks.find((framework) => framework.value === value)?.label
              ? searchAreas[area].find(ar => ar == value)
              : "Select"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        { open && <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Area..." className="h-9" />
            <CommandList>
              <CommandEmpty>No area found.</CommandEmpty>
              <CommandGroup>
                {searchAreas[area].map((ar, index) => (
                  <CommandItem
                    key={index}
                    value={ar}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      console.log("selected!")
                      setOpen(false)
                    }}
                  >
                    {ar}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === ar ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>}
      </Popover>

    </>
  )
}



const Page = (props: props) => {

  const router = useRouter()
  const { toast } = useToast()
  const [pincode, setPincode] = useState("")
  const user = useStore(state => state.user)
  const [loading, setLoading] = useState(false)
  const [area, setArea] = useState<"city" | "state" | "zone">("zone")
  const [location, setLocation] = useState("")
  const setLicenseModal = useStore(state => state.setLicenseModal)
  const licenseModal = useStore(state => state.licenseModal)

  const findNearestStation = async (pincode: string) => {
    try {
      if(!pincode.match(new RegExp("^[1-9][0-9]{5}$"))) return toast({
        title: "Invalid PinCode",
        description: "Please Enter The Correct Pincode To Get The Details.",
        variant: "destructive"
      })
      setLoading(true)
      const station = await findNearestPoliceStation(pincode)
      if (station) router.push(`/policeStation?stationId=${station.id}`)
      else toast({
        title: "No Nearest Police Station Found",
        description: "You can get the information of it as soon as they register to us"
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLicenseApply = async () => {
    try {
      console.log(user)
      if(!user) return router.push("/auth/signin")
      Document.parse(user?.userDocuments)
      Address.parse(user?.address[0])
      setLicenseModal()
    } catch (error) {
      console.log(error)
      toast({ title: "Please fill the details first!", description: "Fill out the details of address and documents to proceed further", variant: "destructive" })
    }
  }


  return (
    <Container className="flex relative flex-col items-center justify-start gap-20 h-auto scroll-smooth">

      {/* background Image */}
      <Image src={"/images/pic1.jpg"} alt={""} width={800} height={800} className="w-full h-[100vh] object-cover absolute -z-10 top-0 left-0 opacity-40" />

      <div className="flex flex-col items-center justify-center gap-10 h-[100vh] md:w-[60%] w-full md:p-0 p-4 animate-appear-up">
        <h1 className="font-bold font-amsterdam italic text-2xl lg:text-6xl text-slate-900 leading-9 md:leading-[3rem] text-center">Law Keeper: Streamlining Law and Order for a Safer Future</h1>
        <p className="text-gray-700 text-xl font-medium text-center">Law Keeper is a pioneering digital platform designed to transform the way law and order are maintained by creating a seamless connection between citizens and law enforcement. Our goal is to streamline the legal and regulatory processes, making them more accessible, efficient, and transparent for everyone involved.</p>
        <Button className="" size={"lg"} onClick={() => scrollTo(0, 806)}>Find Help!</Button>
      </div>

      <div className="w-full h-[100vh] flex items-center justify-center flex-wrap gap-x-10 gap-y-4 pt-10">

        <CardBuilder
          title="Know Your Officials"
          description="Get the details of the officials in your zone/range/city/state"
          content={
            <SearchByArea area={area} setArea={setArea} value={location} setValue={setLocation} />
          }
          footer={
            <Button onClick={() => router.push(`/officers?area=${area}&location=${location}`)}>Search</Button>
          }
        />

        <CardBuilder
          title="Know Your Nearest Police Station"
          description="Get the details for your nearest police station to file a complaint and ask for help"
          content={
            <>
              <label htmlFor="inp">Enter your postalcode</label>
              <Input placeholder="For Ex. 700017" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </>
          }
          footer={
            <Button onClick={() => findNearestStation(pincode)} disabled={loading}>Search</Button>
          }
        />

        <CardBuilder
          title="Missing Person"
          description="Get the details for all the missing persons reported in different police stations"
          content={
            <p>Hyper-Links for websites of various organisations for the display of missing persons, Children, Unidentified bodies.</p>
          }
          footer={
            <Button>Click Here To View</Button>
          }
        />


        <CardBuilder
          title="Women And Child Security Organization"
          description="Get the details for Women and child Security organisations both private and public"
          content={
            <p>A Police Unit for addressing offences against Children & Women</p>
          }
          footer={
            <Button onClick={() => router.push("/women-child-organization")}>Read More</Button>
          }
        />

        <CardBuilder
          title="E-FIR"
          description="File E-FIR online as soon as you want to report a case"
          content={
            <>
              <p>e-FIR facility available for unknown accused cases</p>
              <p>Helpline no. 0522 - 2390261</p>
            </>
          }
          footer={
            <Button onClick={() => router.push("efir")}>File An E-FIR</Button>
          }
        />

        <CardBuilder
          title="Apply for licences"
          description="You can apply for different kinds of licences here"
          content={
            <>
              {/* <SearchByArea /> */}
              <p>
                Apply for Firearm License, Liquor Licence, Event And Entertainment License, Pet License, etc...
              </p>
            </>
          }
          footer={
            <Button onClick={() => handleLicenseApply()}>Apply</Button>
          }
        />

        { licenseModal && <LicenseModal /> }

      </div>

    </Container>
  )
}

export default Page
