'use client';

import { useState, useTransition } from 'react';
import {
  createVehicleAction,
  updateVehicleAction,
  deleteVehicleAction,
  toggleVehicleAvailabilityAction,
} from '@/app/actions';
import { Vehicle } from '@prisma/client';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Car,
  X,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface Props {
  initialVehicles: Vehicle[];
}

export default function AdminVehicleManager({ initialVehicles }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    type: 'Sedan',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 3500,
    availability: true,
    image: '',
    description: '',
  });

  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({
      name: '',
      type: 'Sedan',
      model: '',
      year: 2023,
      pricePerDay: 4000,
      availability: true,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      description: '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      model: vehicle.model,
      year: vehicle.year,
      pricePerDay: vehicle.pricePerDay,
      availability: vehicle.availability,
      image: vehicle.image,
      description: vehicle.description,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
    setFormError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const fData = new FormData();
    fData.append('name', formData.name);
    fData.append('type', formData.type);
    fData.append('model', formData.model);
    fData.append('year', String(formData.year));
    fData.append('pricePerDay', String(formData.pricePerDay));
    fData.append('availability', String(formData.availability));
    fData.append('image', formData.image);
    fData.append('description', formData.description);

    startTransition(async () => {
      try {
        if (editingVehicle) {
          const res = await updateVehicleAction(editingVehicle.id, fData);
          if (res?.error) {
            setFormError(res.error);
            return;
          }
          setVehicles((prev) =>
            prev.map((v) => (v.id === editingVehicle.id ? { ...v, ...formData } : v))
          );
        } else {
          const res = await createVehicleAction(fData);
          if (res?.error) {
            setFormError(res.error);
            return;
          }
          window.location.reload(); // sync list
        }
        closeModal();
      } catch (err: any) {
        setFormError(err.message || 'Operation failed');
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this vehicle from the fleet?')) return;

    startTransition(async () => {
      await deleteVehicleAction(id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    });
  };

  const handleToggleAvailability = (id: number) => {
    startTransition(async () => {
      await toggleVehicleAvailabilityAction(id);
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, availability: !v.availability } : v))
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Fleet Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add new inventory, edit car specifications, update daily rates, or toggle availability.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Table of Vehicles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Vehicle</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Model & Year</th>
                <th className="py-4 px-4">Price / Day</th>
                <th className="py-4 px-4">Availability</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-14 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{v.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">
                          {v.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {v.type}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-medium text-slate-700">
                    {v.model} &bull; <span className="text-slate-500">{v.year}</span>
                  </td>

                  <td className="py-4 px-4 font-extrabold text-blue-600">
                    ৳{v.pricePerDay.toLocaleString()}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleAvailability(v.id)}
                      disabled={isPending}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                        v.availability
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                      }`}
                      title="Click to toggle availability"
                    >
                      {v.availability ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Unavailable</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(v)}
                        disabled={isPending}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Vehicle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(v.id)}
                        disabled={isPending}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-lg">
                  {editingVehicle ? 'Edit Vehicle Details' : 'Add Vehicle to Fleet'}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Toyota Axio"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Microbus">Microbus</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Hybrid"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    min={2000}
                    max={2030}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Price/Day (৳)
                  </label>
                  <input
                    type="number"
                    required
                    min={500}
                    step={100}
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of vehicle condition, features, etc."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="availCheck"
                  checked={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="availCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Vehicle is available for immediate rental
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingVehicle ? 'Save Changes' : 'Add Vehicle'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
