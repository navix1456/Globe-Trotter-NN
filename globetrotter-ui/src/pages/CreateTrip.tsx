import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search, Sparkles, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import type { City, Activity, TripFormData } from '../types';

// Mock data - replace with API calls
const mockCities: City[] = [
  { id: '1', name: 'Paris', countryId: '1', countryName: 'France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', costIndex: 1.5 },
  { id: '2', name: 'Tokyo', countryId: '2', countryName: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', costIndex: 1.4 },
  { id: '3', name: 'New York', countryId: '3', countryName: 'USA', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', costIndex: 1.6 },
  { id: '4', name: 'Bali', countryId: '4', countryName: 'Indonesia', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', costIndex: 0.7 },
  { id: '5', name: 'Mumbai', countryId: '5', countryName: 'India', imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400', costIndex: 0.5 },
  { id: '6', name: 'Dubai', countryId: '6', countryName: 'UAE', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', costIndex: 1.3 },
];

const mockActivities: Activity[] = [
  { id: '1', name: 'Eiffel Tower Visit', cityId: '1', cityName: 'Paris', description: 'Iconic landmark with panoramic views', cost: 25, currencyCode: 'EUR', isFree: false, imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=300', rating: 4.8 },
  { id: '2', name: 'Louvre Museum', cityId: '1', cityName: 'Paris', description: 'World-famous art museum', cost: 17, currencyCode: 'EUR', isFree: false, imageUrl: 'https://images.unsplash.com/photo-1499426600726-ac36e0ad1882?w=300', rating: 4.9 },
  { id: '3', name: 'Seine River Cruise', cityId: '1', cityName: 'Paris', description: 'Scenic boat tour', cost: 15, currencyCode: 'EUR', isFree: false, imageUrl: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=300', rating: 4.6 },
  { id: '4', name: 'Senso-ji Temple', cityId: '2', cityName: 'Tokyo', description: 'Ancient Buddhist temple', cost: 0, currencyCode: 'JPY', isFree: true, imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300', rating: 4.7 },
  { id: '5', name: 'Shibuya Crossing', cityId: '2', cityName: 'Tokyo', description: 'Famous pedestrian scramble', cost: 0, currencyCode: 'JPY', isFree: true, imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300', rating: 4.5 },
  { id: '6', name: 'Central Park Walk', cityId: '3', cityName: 'New York', description: 'Iconic urban park', cost: 0, currencyCode: 'USD', isFree: true, imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300', rating: 4.8 },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TripFormData>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    totalBudget: undefined,
    currencyCode: 'INR',
  });
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [suggestedActivities, setSuggestedActivities] = useState<Activity[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCities = mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      city.countryName?.toLowerCase().includes(citySearch.toLowerCase())
  );

  useEffect(() => {
    if (selectedCity) {
      const activities = mockActivities.filter((a) => a.cityId === selectedCity.id);
      setSuggestedActivities(activities.length > 0 ? activities : mockActivities.slice(0, 4));
    }
  }, [selectedCity]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCitySearch(city.name);
    setShowCityDropdown(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!selectedCity) {
      newErrors.city = 'Please select a destination';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate to build itinerary with form data
      navigate('/trips/build', {
        state: {
          tripData: formData,
          initialCity: selectedCity,
        },
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="create-trip-page">
      <div className="create-trip-container">
        <div className="create-trip-header">
          <h1>Plan a new trip</h1>
          <p className="subtitle">Start your adventure by filling in the basic details</p>
        </div>

        <form onSubmit={handleSubmit} className="create-trip-form">
          <div className="form-section">
            <Input
              label="Trip Name"
              placeholder="e.g., Summer Europe Adventure"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
            />

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">
                  <Calendar size={16} />
                  Start Date<span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.startDate ? 'error' : ''}`}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  min={today}
                />
                {errors.startDate && <span className="form-error">{errors.startDate}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">
                  <Calendar size={16} />
                  End Date<span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.endDate ? 'error' : ''}`}
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  min={formData.startDate || today}
                />
                {errors.endDate && <span className="form-error">{errors.endDate}</span>}
              </div>
            </div>

            <div className="form-field city-search-field">
              <label className="form-label">
                <MapPin size={16} />
                Select a Place<span className="required">*</span>
              </label>
              <div className="city-search-wrapper">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  className={`form-input city-search-input ${errors.city ? 'error' : ''}`}
                  placeholder="Search for a city..."
                  value={citySearch}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setShowCityDropdown(true);
                    if (selectedCity && e.target.value !== selectedCity.name) {
                      setSelectedCity(null);
                    }
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                />
                {showCityDropdown && citySearch && (
                  <div className="city-dropdown">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          className="city-option"
                          onClick={() => handleCitySelect(city)}
                        >
                          <img src={city.imageUrl} alt={city.name} className="city-thumb" />
                          <div className="city-info">
                            <span className="city-name">{city.name}</span>
                            <span className="city-country">{city.countryName}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="no-results">No cities found</div>
                    )}
                  </div>
                )}
              </div>
              {errors.city && <span className="form-error">{errors.city}</span>}
              {selectedCity && (
                <div className="selected-city-tag">
                  <MapPin size={14} />
                  {selectedCity.name}, {selectedCity.countryName}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Budget (Optional)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g., 50000"
                  value={formData.totalBudget || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, totalBudget: e.target.value ? Number(e.target.value) : undefined })
                  }
                  min="0"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Currency</label>
                <select
                  className="form-select"
                  value={formData.currencyCode}
                  onChange={(e) => setFormData({ ...formData, currencyCode: e.target.value })}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>

          {selectedCity && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <Sparkles size={20} className="sparkle-icon" />
                <h2>Suggested Activities in {selectedCity.name}</h2>
              </div>
              <div className="activities-grid">
                {suggestedActivities.map((activity) => (
                  <div key={activity.id} className="activity-card">
                    <div className="activity-image">
                      <img src={activity.imageUrl} alt={activity.name} />
                      {activity.isFree && <span className="free-badge">Free</span>}
                    </div>
                    <div className="activity-content">
                      <h3>{activity.name}</h3>
                      <p>{activity.description}</p>
                      <div className="activity-meta">
                        {!activity.isFree && (
                          <span className="activity-cost">
                            {activity.currencyCode} {activity.cost}
                          </span>
                        )}
                        {activity.rating && (
                          <span className="activity-rating">★ {activity.rating}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Continue to Build Itinerary
              <ArrowRight size={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
