import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function InterestForm() {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch, trigger } = useForm()
  const [hovered, setHovered] = useState(false)

  const onSubmit = data => {
    console.log('Form Data:', data)
    reset()
  }

  const phone = watch('phone', '')
  const spidrPin = watch('spidrPin', '')

  const formatPhone = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      const part1 = match[1] ? `(${match[1]}` : ''
      const part2 = match[2] ? `) ${match[2]}` : ''
      const part3 = match[3] ? `-${match[3]}` : ''
      return `${part1}${part2}${part3}`.trim()
    }
    return value
  }

  const formatSpidrPin = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16)
    return cleaned.match(/.{1,4}/g)?.join('-') || ''
  }

  const errorClass = "text-red-500 text-sm break-words w-full overflow-wrap break-word"

  return (
    <div
      className="max-w-lg mx-auto p-6 rounded-xl shadow-md border border-gray-200 relative overflow-hidden min-h-[600px] w-full max-w-sm"
      style={{ backgroundColor: 'rgb(40, 40, 40)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-spidrBlue relative z-10">Reserve Your Air Fryer!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white relative z-10">
        <div>
          <label className="block font-medium">First Name</label>
          <input {...register('firstName', { pattern: /^[A-Za-z]+$/ })} className="w-full border rounded-md p-2 border-gray-300 text-black" required onBlur={() => trigger('firstName')} />
          {errors.firstName && <p className={errorClass}>First name should contain only letters.</p>}
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input {...register('lastName', { pattern: /^[A-Za-z]+$/ })} className="w-full border rounded-md p-2 border-gray-300 text-black" required onBlur={() => trigger('lastName')} />
          {errors.lastName && <p className={errorClass}>Last name should contain only letters.</p>}
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            {...register('phone', { pattern: /^\(\d{3}\) \d{3}-\d{4}$/ })}
            type="tel"
            className="w-full border rounded-md p-2 border-gray-300 text-black"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={(e) => setValue('phone', formatPhone(e.target.value))}
            onBlur={() => trigger('phone')}
            required
          />
          {errors.phone && <p className={errorClass}>Phone number must be in format (123) 456-7890.</p>}
        </div>

        <div>
          <label className="block font-medium">Email Address</label>
          <input {...register('email', { pattern: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/ })} type="email" className="w-full border rounded-md p-2 border-gray-300 text-black" required onBlur={() => trigger('email')} />
          {errors.email && <p className={errorClass}>Please enter a valid email address.</p>}
        </div>

        <div>
          <label className="block font-medium">Guess the Air Fryer Cost ($)</label>
          <input {...register('guessCost', { min: 1, max: 1000 })} type="number" className="w-full border rounded-md p-2 border-gray-300 text-black" required onBlur={() => trigger('guessCost')} />
          {errors.guessCost && <p className={errorClass}>Cost must be between $1 and $1000.</p>}
        </div>

        <div>
          <label className="block font-medium">Very, Very Secret 16-digit Spidr PIN</label>
          <input
            {...register('spidrPin', { pattern: /^\d{4}-\d{4}-\d{4}-\d{4}$/ })}
            type="text"
            placeholder="1234-5678-9012-3456"
            className="w-full border rounded-md p-2 border-gray-300 text-black"
            value={spidrPin}
            onChange={(e) => setValue('spidrPin', formatSpidrPin(e.target.value))}
            onBlur={() => trigger('spidrPin')}
            required
          />
          {errors.spidrPin && <p className={errorClass}>PIN must be formatted as 1234-5678-9012-3456.</p>}
        </div>

        <button
          type="submit"
          className="border-2 border-spidrBlue text-spidrBlue font-semibold py-2 px-4 rounded-full hover:bg-spidrBlue hover:text-white transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
