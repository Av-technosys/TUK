import { NextRequest, NextResponse } from 'next/server';

// Initial privacy policy data
let privacyPolicyData = {
  id: '4',
  title: 'Privacy Policy',
  slug: 'privacy-policy',
  subtitle: 'Your data privacy and protection is important to us.',
  sections: [
    {
      title: 'Who We Are',
      content:
        'TUK Ltd produces and supplies cabling systems and connectivity. This policy relates to all such activities including those of any group companies.',
    },
    {
      title: 'Types of Data We Process',
      subsections: [
        {
          subtitle: 'General',
          content:
            'We hold data about employees, customers and suppliers. We store only necessary information and do not share with third parties unless required.',
        },
        {
          subtitle: 'Cookies',
          content: 'We minimise cookies data and do not use them for marketing.',
        },
        {
          subtitle: 'Website Analytics',
          content: 'We use anonymised analytics to improve performance.',
        },
        {
          subtitle: 'Mailing Lists',
          content:
            'We use collected data to inform customers about products. No data selling.',
        },
        {
          subtitle: 'Public Information',
          content:
            'Public domain data may be retained unless requested otherwise.',
        },
      ],
    },
    {
      title: 'How We Use Data',
      content: `
        • Provide goods and services
        • Promotions and updates
        • Manage accounts
        • Verify identity
        • Fraud prevention
        • Market research
        • Customer service
        • Legal compliance
      `,
    },
    {
      title: 'Access to Your Personal Information',
      content:
        'You can request access, modification or deletion of your data under GDPR.',
    },
    {
      title: 'Responsible Person',
      content:
        'Managing Director Stephen Mercier is responsible for data handling.',
    },
    {
      title: 'Policy Updates',
      content: 'Last updated: 24 May 2019',
    },
  ],
};

// GET request to fetch privacy policy data
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(privacyPolicyData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch privacy policy' },
      { status: 500 }
    );
  }
}

// POST request to update privacy policy data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Update the privacy policy data
    privacyPolicyData = {
      ...privacyPolicyData,
      ...body,
    };

    return NextResponse.json(
      { message: 'Privacy policy updated successfully', data: privacyPolicyData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update privacy policy' },
      { status: 500 }
    );
  }
}
