import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

function ContactFormSection() {
    return (
        <section>
            <div className='flex flex-col items-center gap-10 py-10 '>
                <div className='flex flex-col items-center gap-2 text-white'>
                    <h1 className='text-4xl font-bold'>Get in Touch</h1>
                    <p className='text-richblack-400 '>We’d love to here for you, Please fill out this form.</p>
                </div>
                <div>
                    {/* form Section  */}
                    <ContactUsForm />
                </div>
            </div>
        </section>
    )
}

export default ContactFormSection
