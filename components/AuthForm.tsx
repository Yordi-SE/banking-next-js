"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { set, z } from "zod"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignIn, SignUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'



export const AuthForm = ({type}: {type: string}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const formSchema = authFormSchema(type)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateofBirth: "",
      ssn: "",

    },
  })
 
  const handleSubmit = async (data: z.infer<typeof formSchema>)  => {
    try{
      setLoading(true)

      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateofBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password

        }
        const newUserData = await SignUp(userData)
        setUser(newUserData)
      }

      if (type === 'sign-in') {
        const response = await SignIn({
          email: data.email,
          password: data.password
        })

        if (response) {
          router.push('/')
        }
      }

    }
    catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
      <Link href={"/"} className='cursor-pointer flex items-center gap-1'>
                <Image src={"/icons/logo.svg"}
                width={34} height={34} alt='logo' />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>
          <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
              {user ?
              'Link Account':
              type === 'sign-in'
              ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className='text-16 font-normal text-gray-600'>
              {user ?
              'Link your account to continue'
              : 'Please enter your details'}
            </p>
          </div>
      </header>
      {
        user ? (
          <div className='flex flex-col gap-4'>
              <PlaidLink user={user} variant="primary" />
          </div>
        ) : (
          <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

                    {
                      type === 'sign-up' && (
                        <>
                        <div className='flex gap-4'>

                          <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />

                          <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />

                        </div>

                        <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                        <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                        <div className='flex gap-4'>

                          <CustomInput control={form.control} name="state" label="State" placeholder="Example: NY" />

                          <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 11101" />

                        </div>
                        <div className='flex gap-4'>

                          <CustomInput control={form.control} name="dateofBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />

                          <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                        </div>
                        </>
                      )
                    }
                      <CustomInput control={form.control} name='email' label="Email" placeholder="Enter your email" />

                      <CustomInput control={form.control} name='password' label="Password" placeholder="Enter your Password" />

                      <div className='flex flex-col gap-4'>
                          <Button disabled={loading} className='form-btn' type="submit" onClick={()=>{
                          }}>
                              {
                                loading ?
                                (
                                    <>
                                      <Loader2 size={20} className='animate-spin'/> &nbsp; Loading...
                                    </>
                                )

                                : type === 'sign-in' ? 'Sign In' : "Sign Up"
                              }
                          </Button>
                      </div>
                  </form>
              </Form>
            <footer className='flex justify-center gap-1'>
              <p className='text-14  font-normal text-gray-600'>
                {type === 'sign-in' ? 'New to Horizon?' : 'Already have an account?'}
              </p>
              <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
              </Link>

            </footer>

            </>
          )
        }
      </section>
  )
}
