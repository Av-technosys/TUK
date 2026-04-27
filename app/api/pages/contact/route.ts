import { NextRequest, NextResponse } from 'next/server';

let contactPageData = {
  id: '5',
  title: 'Contact Page',
  slug: 'contact',
  hero: {
    title: 'Contact Us',
    subtitle:
      'Get in touch with our expert team for voice and data cabling solutions, technical support, or bespoke requirements.',
  },
  contactInfo: {
    heading: 'Get In Touch',
    address: {
      label: 'Our Address',
      value: 'Unit 4, Wimbledon Stadium Business Centre, Riverside Road, London SW17 0BA',
    },
    phone: {
      label: 'Phone',
      value: '+44 (0) 20 8946 6688',
    },
    email: {
      label: 'Email',
      value: 'sales@tuk.co.uk',
    },
  },
  formInfo: {
    heading: 'Send us a Message',
    description: 'We will get back to you as soon as possible.',
    inquiryTypes: [
      { value: 'product-inquiry', label: 'Product Inquiry' },
      { value: 'technical-support', label: 'Technical Support' },
      { value: 'quote', label: 'Request a Quote' },
      { value: 'other', label: 'Other' },
    ],
  },
};

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(contactPageData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contact page' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    contactPageData = {
      ...contactPageData,
      ...body,
    };
    return NextResponse.json(
      { message: 'Contact page updated successfully', data: contactPageData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact page' },
      { status: 500 }
    );
  }
}
