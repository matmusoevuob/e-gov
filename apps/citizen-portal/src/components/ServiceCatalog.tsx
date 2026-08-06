import React, { useState } from 'react';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { Language, translations } from '../locales/i18n';

interface ServiceCatalogProps {
  onStartApplication: (service: ServiceItem) => void;
  lang: Language;
}

const SERVICE_KEYS = ['srv_passport', 'srv_business', 'srv_tax', 'srv_driver', 'srv_health', 'srv_property'];

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onStartApplication, lang }) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Build localized services list dynamically
  const localizedServices: ServiceItem[] = SERVICE_KEYS.map(id => {
    const s = t.services[id];
    return {
      id,
      title: s.title,
      category: s.category as any,
      description: s.description,
      processingTime: s.processingTime,
      fee: id === 'srv_passport' ? '$45.00' : id === 'srv_business' ? '$120.00' : id === 'srv_property' ? '$15.00' : id === 'srv_driver' ? '$25.00' : '$0.00',
      department: s.department,
      popular: id === 'srv_passport' || id === 'srv_business' || id === 'srv_tax'
    };
  });

  const categories = [
    { key: 'ALL', label: t.catAll },
    { key: 'Identity', label: t.catIdentity },
    { key: 'Business', label: t.catBusiness },
    { key: 'Tax', label: t.catTax },
    { key: 'Transport', label: t.catTransport },
    { key: 'Health', label: t.catHealth },
    { key: 'Housing', label: t.catHousing }
  ];

  const filteredServices = localizedServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || service.category.toLowerCase() === selectedCategory.toLowerCase() || (selectedCategory === 'Identity' && service.id === 'srv_passport');
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
          {t.servicesCatalog}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Standardized digital public services powered by X-Road inter-agency integration (gov.tj).
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gov-input"
            style={{ paddingLeft: '42px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: selectedCategory === cat.key ? '1px solid var(--gov-blue)' : '1px solid var(--border-subtle)',
                background: selectedCategory === cat.key ? 'var(--gov-blue)' : 'var(--bg-card)',
                color: selectedCategory === cat.key ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredServices.map(service => (
          <div key={service.id} className="gov-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-info">{service.category}</span>
                {service.popular && <span className="badge badge-success">POPULAR</span>}
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '16px', minHeight: '48px' }}>
                {service.description}
              </p>
            </div>

            <div>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {service.processingTime}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--gov-blue)' }}>
                  Fee: {service.fee}
                </span>
              </div>

              <button
                className="btn-gov-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onStartApplication(service)}
              >
                <span>{t.nextStepBtn}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
