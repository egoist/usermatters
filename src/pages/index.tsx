import Link from 'next/link'
import { AppLayout } from '$src/components/AppLayout'
import React from 'react'
import { CodeBlock } from '$src/components/CodeBlock'
import { FeedbackPopup } from 'usermatters-react'

const PriceCard: React.FC<{
  label: string
  price: number
  features: string[]
}> = ({ label, price, features }) => {
  return (
    <div className="border rounded-lg p-5">
      <div className="uppercase mb-1">{label}</div>
      <div className="text-5xl font-bold border-b mb-4 pb-4 leading-none">
        ${price}
        {price > 0 && <span className="text-base text-gray-400">/month</span>}
      </div>
      <ul>
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Section: React.FC<{ title: string; id: string }> = ({
  title,
  id,
  children,
}) => {
  return (
    <section className="my-20">
      <h3 id={id} className="text-3xl font-bold mb-5">
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function HomePage() {
  return (
    <AppLayout>
      <h2 className="text-5xl font-bold mt-10">Start collecting feedbacks</h2>
      <h3 className="text-3xl mt-3 italic text-gray-600">
        Because every{' '}
        <span className="text-highlight text-black">user matters™</span>.
      </h3>
      <div className="mt-3 text-gray-400">
        User Matters offers a simple JS widget to help you get customer feedback
        effortlessly.
      </div>
      <div className="mt-10">
        <Link href="/login">
          <a className="button is-primary">Getting Started</a>
        </Link>
      </div>
      <Section title="Quick setup" id="setup">
        <div className="mb-2">Super low-code, just a couple lines of HTML.</div>
        <CodeBlock
          code={`<script async defer src="https://cdn.usermatters.app/widget.js">
          
<button 
  data-usermatters-project="YOUR_PROJECT_ID"
  data-usermatters-user="John Titor john@example.com">
  Feedback
</button>`}
          lang="markup"
        />
        <div className="mt-3">Check out the feedback button live below!</div>
        <div className="mt-3">
          <FeedbackPopup project="usermatters_demo" api="/api/graphql">
            {({ handleClick }) => (
              <button
                onClick={handleClick}
                className="border bg-white shadow text-sm rounded-lg px-2 py-1 hover:bg-gray-100"
              >
                💬 Feedback
              </button>
            )}
          </FeedbackPopup>
        </div>
      </Section>
      <Section title="Elegant dashboard" id="dashboard">
        Browse and manage your feedbacks with ease.
      </Section>
      <Section title="Pricing" id="pricing">
        <div className="grid md:grid-cols-2 gap-4">
          <PriceCard
            label="Free"
            price={0}
            features={[
              '2 Projects',
              '50 total submissions / project',
              'Email notifications',
              'Email support',
            ]}
          />
          <PriceCard
            label="Pro"
            price={10}
            features={[
              'Unlimited projects',
              'Unlimited submissions',
              'Email notifications',
              'Email support',
            ]}
          />
        </div>
        <div className="text-2xl mt-5">
          🤩 It's free with <span className="text-highlight">no limits</span>{' '}
          during beta, so why not try it for yourself?{' '}
          <Link href="/login">
            <a className="text-indigo-500 hover:underline">
              Start collecting feedbacks now
            </a>
          </Link>
          .
        </div>
      </Section>
    </AppLayout>
  )
}
