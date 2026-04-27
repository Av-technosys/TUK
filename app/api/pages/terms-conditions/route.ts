import { NextRequest, NextResponse } from 'next/server';

let termsPageData = {
  id: '3',
  title: 'Terms & Conditions',
  slug: 'terms-conditions',
  subtitle: 'Please read these terms carefully before using our services.',
  sections: [
    {
      id: 'uk',
      title: 'Sales to UK Customers',
      content: [
        'Free three day delivery on UK mainland. Additional charges apply for highlands, islands and export. Next working day delivery upgrade costs £7.',
        'Orders before 2:45 pm are processed same day unless delayed dispatch requested.',
      ],
      subsections: [
        {
          subtitle: 'Small Orders',
          content: '• £10 charge for orders under £50\n• £13 handling charge under £250 (excluding VAT)',
        },
        {
          subtitle: 'General',
          content: '• Products subject to availability\n• Report delivery issues within 5 days / 48 hours\n• 12-month warranty (repair / replace / refund)\n• No liability beyond product value\n• Prices exclude VAT\n• Ownership retained until payment',
        },
      ],
    },
    {
      id: 'overseas',
      title: 'Sales to Overseas Customers',
      content: [
        'Orders dispatched after confirmation and payment setup.',
      ],
      subsections: [
        {
          subtitle: 'Terms',
          content: '• Prices EXW (Incoterms 2010)\n• Netherlands & Ireland: DDP\n• Minimum order £100\n• Prepayment required\n• Delivery issues within 7 days / 48 hours\n• 12-month warranty\n• Prices valid 30 days',
        },
      ],
    },
    {
      id: 'credit',
      title: 'Credit Accounts',
      content: [],
      subsections: [
        {
          subtitle: 'Credit Terms',
          content: '• 2 trade references required\n• Strict 30-day payment terms\n• Late payments may suspend account\n• Deliveries may stop if overdue\n• 1.5% monthly interest on overdue\n• Outstanding balances may be offset',
        },
      ],
    },
    {
      id: 'general',
      title: 'General Terms',
      content: ['Last updated: November 2025'],
      subsections: [
        {
          subtitle: 'General Terms',
          content: '• Product descriptions may vary\n• IP rights protected\n• Customer data retained (min 2 years)\n• Terms updated periodically',
        },
      ],
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(termsPageData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch terms page' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    termsPageData = {
      ...termsPageData,
      ...body,
    };
    return NextResponse.json(
      { message: 'Terms page updated successfully', data: termsPageData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update terms page' },
      { status: 500 }
    );
  }
}
