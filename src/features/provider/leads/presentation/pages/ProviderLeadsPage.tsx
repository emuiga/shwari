'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import LeadCard from '@/features/provider/leads/presentation/components/LeadCard';
import DeclineLeadModal from '@/features/provider/leads/presentation/components/DeclineLeadModal';
import AcceptServiceRequestModal from '@/features/provider/leads/presentation/components/AcceptServiceRequestModal';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import { CheckCircleIcon } from '@/components/icons';
import { mockLeads, type Lead, type LeadStatus } from '@/features/provider/leads/presentation/lib/mockLeads';

type Tab = 'all' | LeadStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function ProviderLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [tab, setTab] = useState<Tab>('all');
  const [declineTarget, setDeclineTarget] = useState<Lead | null>(null);
  const [acceptTarget, setAcceptTarget] = useState<Lead | null>(null);

  const filteredLeads = tab === 'all' ? leads : leads.filter((lead) => lead.status === tab);

  function handleAcceptConfirm() {
    if (!acceptTarget) return;
    setLeads((current) => current.map((lead) => (lead.id === acceptTarget.id ? { ...lead, status: 'active' } : lead)));
    toast.success('Service request accepted', {
      description: `${acceptTarget.customerName}'s request has been added to your active jobs.`,
    });
    setAcceptTarget(null);
  }

  function handleDeclineConfirm() {
    if (!declineTarget) return;
    setLeads((current) => current.filter((lead) => lead.id !== declineTarget.id));
    toast.success('Service request declined', {
      description: `${declineTarget.customerName}'s request has been reassigned to another provider.`,
    });
    setDeclineTarget(null);
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <h1 className="page-title">Leads management</h1>
        <p className="page-subtitle">View and manage all requests that have been mapped to you</p>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((item) => {
            const count = item.key === 'all' ? leads.length : leads.filter((lead) => lead.status === item.key).length;
            const isActive = tab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${
                  isActive ? 'bg-primary text-white' : 'bg-surface-muted text-body hover:bg-gray-200'
                }`}
              >
                {item.label} {count}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-control border border-green-200 bg-primary-subtle px-3 py-2.5">
          <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs text-primary-emphasis">
            Service requests that are declined or not accepted within 6hrs are automatically reassigned to another Service Provider.
          </p>
        </div>

        {filteredLeads.length === 0 ? (
          <EmptyState
            className="mt-6"
            title="No leads here yet"
            description="New customer requests mapped to you will show up in this tab."
          />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onAccept={setAcceptTarget} onDecline={setDeclineTarget} />
            ))}
          </div>
        )}
      </main>

      {declineTarget && (
        <DeclineLeadModal lead={declineTarget} onCancel={() => setDeclineTarget(null)} onConfirm={handleDeclineConfirm} />
      )}

      {acceptTarget && (
        <AcceptServiceRequestModal lead={acceptTarget} onCancel={() => setAcceptTarget(null)} onConfirm={handleAcceptConfirm} />
      )}
    </div>
  );
}
