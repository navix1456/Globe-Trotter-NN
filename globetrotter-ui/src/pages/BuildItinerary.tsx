import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  GripVertical,
  MapPin,
  Calendar,
  DollarSign,
  Hotel,
  Plane,
  Search,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
} from 'lucide-react';
import Button from '../components/ui/Button';
import type { City, TripFormData, TripStopFormData } from '../types';

// Mock cities data
const mockCities: City[] = [
  { id: '1', name: 'Paris', countryId: '1', countryName: 'France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: '2', name: 'Tokyo', countryId: '2', countryName: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
  { id: '3', name: 'New York', countryId: '3', countryName: 'USA', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
  { id: '4', name: 'Bali', countryId: '4', countryName: 'Indonesia', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  { id: '5', name: 'Mumbai', countryId: '5', countryName: 'India', imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400' },
  { id: '6', name: 'Dubai', countryId: '6', countryName: 'UAE', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
  { id: '7', name: 'London', countryId: '7', countryName: 'UK', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400' },
  { id: '8', name: 'Barcelona', countryId: '8', countryName: 'Spain', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400' },
];

interface ItinerarySection extends TripStopFormData {
  id: string;
  isExpanded: boolean;
  cityName?: string;
  countryName?: string;
}

const transportTypes = [
  { value: 'flight', label: 'Flight', icon: Plane },
  { value: 'train', label: 'Train', icon: Plane },
  { value: 'bus', label: 'Bus', icon: Plane },
  { value: 'car', label: 'Car', icon: Plane },
  { value: 'other', label: 'Other', icon: Plane },
];

export default function BuildItinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData as TripFormData | undefined;
  const initialCity = location.state?.initialCity as City | undefined;

  const [sections, setSections] = useState<ItinerarySection[]>([]);
  const [citySearches, setCitySearches] = useState<Record<string, string>>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with first section if we have initial data
    if (tripData && initialCity) {
      const initialSection: ItinerarySection = {
        id: crypto.randomUUID(),
        cityId: initialCity.id,
        cityName: initialCity.name,
        countryName: initialCity.countryName,
        arrivalDate: tripData.startDate,
        departureDate: tripData.endDate,
        isExpanded: true,
        accommodationName: '',
        accommodationCost: undefined,
        transportType: '',
        transportCost: undefined,
        notes: '',
      };
      setSections([initialSection]);
      setCitySearches({ [initialSection.id]: initialCity.name });
    } else {
      // Add empty first section
      addSection();
    }
  }, []);

  const addSection = () => {
    const lastSection = sections[sections.length - 1];
    const newSection: ItinerarySection = {
      id: crypto.randomUUID(),
      cityId: '',
      arrivalDate: lastSection?.departureDate || tripData?.startDate || '',
      departureDate: '',
      isExpanded: true,
      accommodationName: '',
      accommodationCost: undefined,
      transportType: '',
      transportCost: undefined,
      notes: '',
    };

    // Collapse other sections
    setSections((prev) => [
      ...prev.map((s) => ({ ...s, isExpanded: false })),
      newSection,
    ]);
    setCitySearches((prev) => ({ ...prev, [newSection.id]: '' }));
  };

  const removeSection = (id: string) => {
    if (sections.length <= 1) return;
    setSections((prev) => prev.filter((s) => s.id !== id));
    setCitySearches((prev) => {
      const newSearches = { ...prev };
      delete newSearches[id];
      return newSearches;
    });
  };

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isExpanded: !s.isExpanded } : s))
    );
  };

  const updateSection = (id: string, updates: Partial<ItinerarySection>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleCitySearch = (sectionId: string, value: string) => {
    setCitySearches((prev) => ({ ...prev, [sectionId]: value }));
    setActiveDropdown(sectionId);
  };

  const selectCity = (sectionId: string, city: City) => {
    updateSection(sectionId, {
      cityId: city.id,
      cityName: city.name,
      countryName: city.countryName,
    });
    setCitySearches((prev) => ({ ...prev, [sectionId]: city.name }));
    setActiveDropdown(null);
  };

  const filteredCities = (sectionId: string) => {
    const search = citySearches[sectionId] || '';
    return mockCities.filter(
      (city) =>
        city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.countryName?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const calculateTotalBudget = () => {
    return sections.reduce((total, section) => {
      return total + (section.accommodationCost || 0) + (section.transportCost || 0);
    }, 0);
  };

  const calculateNights = (arrival: string, departure: string) => {
    if (!arrival || !departure) return 0;
    const start = new Date(arrival);
    const end = new Date(departure);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const handleSave = () => {
    // Validate sections
    const isValid = sections.every((s) => s.cityId && s.arrivalDate && s.departureDate);
    if (!isValid) {
      alert('Please fill in all required fields for each section');
      return;
    }

    // Save trip (API call would go here)
    console.log('Saving trip:', { tripData, sections });
    navigate('/trips');
  };

  return (
    <div className="build-itinerary-page">
      <div className="build-itinerary-container">
        <div className="itinerary-header">
          <div className="header-info">
            <h1>Build Itinerary</h1>
            {tripData && (
              <p className="trip-summary">
                {tripData.name} • {new Date(tripData.startDate).toLocaleDateString()} -{' '}
                {new Date(tripData.endDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-value">{sections.length}</span>
              <span className="stat-label">Stops</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {sections.reduce((t, s) => t + calculateNights(s.arrivalDate, s.departureDate), 0)}
              </span>
              <span className="stat-label">Nights</span>
            </div>
            <div className="stat">
              <span className="stat-value">₹{calculateTotalBudget().toLocaleString()}</span>
              <span className="stat-label">Est. Cost</span>
            </div>
          </div>
        </div>

        <div className="sections-list">
          {sections.map((section, index) => (
            <div key={section.id} className={`itinerary-section ${section.isExpanded ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection(section.id)}>
                <div className="section-drag">
                  <GripVertical size={18} />
                </div>
                <div className="section-number">
                  <span>{index + 1}</span>
                </div>
                <div className="section-title">
                  <h3>
                    {section.cityName ? (
                      <>
                        <MapPin size={16} />
                        {section.cityName}, {section.countryName}
                      </>
                    ) : (
                      'New Stop'
                    )}
                  </h3>
                  {section.arrivalDate && section.departureDate && (
                    <span className="section-dates">
                      {new Date(section.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {' - '}
                      {new Date(section.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {' • '}
                      {calculateNights(section.arrivalDate, section.departureDate)} nights
                    </span>
                  )}
                </div>
                <div className="section-actions">
                  {sections.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(section.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button type="button" className="icon-btn">
                    {section.isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {section.isExpanded && (
                <div className="section-content">
                  <p className="section-description">
                    Add the necessary information about this section. This can be anything like travel section, hotel or any other activity.
                  </p>

                  <div className="section-form">
                    <div className="form-field city-field">
                      <label className="form-label">
                        <MapPin size={16} />
                        Destination<span className="required">*</span>
                      </label>
                      <div className="city-search-wrapper">
                        <Search className="search-icon" size={16} />
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Search for a city..."
                          value={citySearches[section.id] || ''}
                          onChange={(e) => handleCitySearch(section.id, e.target.value)}
                          onFocus={() => setActiveDropdown(section.id)}
                        />
                        {activeDropdown === section.id && (
                          <div className="city-dropdown">
                            {filteredCities(section.id).map((city) => (
                              <button
                                key={city.id}
                                type="button"
                                className="city-option"
                                onClick={() => selectCity(section.id, city)}
                              >
                                <img src={city.imageUrl} alt={city.name} className="city-thumb" />
                                <div className="city-info">
                                  <span className="city-name">{city.name}</span>
                                  <span className="city-country">{city.countryName}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">
                          <Calendar size={16} />
                          Arrival Date<span className="required">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-input"
                          value={section.arrivalDate}
                          onChange={(e) => updateSection(section.id, { arrivalDate: e.target.value })}
                          min={tripData?.startDate}
                          max={tripData?.endDate}
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">
                          <Calendar size={16} />
                          Departure Date<span className="required">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-input"
                          value={section.departureDate}
                          onChange={(e) => updateSection(section.id, { departureDate: e.target.value })}
                          min={section.arrivalDate || tripData?.startDate}
                          max={tripData?.endDate}
                        />
                      </div>
                    </div>

                    <div className="form-divider">
                      <span>Accommodation</span>
                    </div>

                    <div className="form-row">
                      <div className="form-field flex-2">
                        <label className="form-label">
                          <Hotel size={16} />
                          Hotel / Stay Name
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g., Marriott Hotel"
                          value={section.accommodationName || ''}
                          onChange={(e) => updateSection(section.id, { accommodationName: e.target.value })}
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">
                          <DollarSign size={16} />
                          Budget
                        </label>
                        <input
                          type="number"
                          className="form-input"
                          placeholder="0"
                          value={section.accommodationCost || ''}
                          onChange={(e) =>
                            updateSection(section.id, {
                              accommodationCost: e.target.value ? Number(e.target.value) : undefined,
                            })
                          }
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-divider">
                      <span>Transportation</span>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">
                          <Plane size={16} />
                          Transport Type
                        </label>
                        <select
                          className="form-select"
                          value={section.transportType || ''}
                          onChange={(e) => updateSection(section.id, { transportType: e.target.value })}
                        >
                          <option value="">Select...</option>
                          {transportTypes.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-field">
                        <label className="form-label">
                          <DollarSign size={16} />
                          Transport Cost
                        </label>
                        <input
                          type="number"
                          className="form-input"
                          placeholder="0"
                          value={section.transportCost || ''}
                          onChange={(e) =>
                            updateSection(section.id, {
                              transportCost: e.target.value ? Number(e.target.value) : undefined,
                            })
                          }
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label">Notes</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Any additional notes for this stop..."
                        value={section.notes || ''}
                        onChange={(e) => updateSection(section.id, { notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="button" className="add-section-btn" onClick={addSection}>
          <Plus size={20} />
          Add another Section
        </button>

        <div className="itinerary-actions">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back
          </Button>
          <div className="action-group">
            <Button variant="outline" onClick={() => console.log('Preview')}>
              <Eye size={18} />
              Preview
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <Save size={18} />
              Save Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
