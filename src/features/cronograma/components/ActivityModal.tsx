import React, { useState, useEffect } from "react"
import { Modal } from "@/features/posts/components/layout/Modal"
import { Calendar, Clock, MapPin } from 'lucide-react'
import { ActivityType } from "../types/activityType"
import { ActivityFormData, useActivityForm } from "../forms/activity-form"
import { createActivity } from "../actions/create-activity"
import { toast } from "react-toastify"

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (activity: Omit<ActivityType, "id">) => void
  activity?: ActivityType
}

export function ActivityModal({ isOpen, onClose, onSave, activity }: ActivityModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useActivityForm()

  useEffect(() => {
    if (activity) {
      reset({
        title: activity.title,
        description: activity.description,
        startHour: activity.startHour,
        endHour: activity.endHour,
        location: activity.location,
        instructor: activity.instructor,
        dayOfWeek: activity.dayOfWeek
      })
    } else {
      reset()
    }
  }, [activity, isOpen, reset])

  const onSubmit = async (data: ActivityFormData) => {
    // onSave(data)
    const res = await createActivity(data);

    if (!res.success) {
      toast.error(res.message || "Erro ao criar atividade.");
      return;
    }

    toast.success(res.message);

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activity ? "Editar Atividade" : "Nova Atividade"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título da Atividade
          </label>
          <input
            {...register("title")}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
            placeholder="Ex: Aula de Reforço - Matemática"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent resize-none"
            placeholder="Descreva a atividade..."
          />
        </div>

        {/* Dia da Semana */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1" />
            Dia da Semana
          </label>
          <select
            {...register("dayOfWeek")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent cursor-pointer"
          >
            <option value="">Selecione um dia</option>
            <option value="Segunda">Segunda-feira</option>
            <option value="Terça">Terça-feira</option>
            <option value="Quarta">Quarta-feira</option>
            <option value="Quinta">Quinta-feira</option>
            <option value="Sexta">Sexta-feira</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          {errors.dayOfWeek && <p className="text-red-500 text-sm">{errors.dayOfWeek.message}</p>}
        </div>

        {/* Horários */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 inline mr-1" />
              Horário de Início
            </label>
            <input
              {...register("startHour", { required: "Horário inicial é obrigatório" })}
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
            />
            {errors.startHour && <p className="text-red-500 text-sm">{errors.startHour.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 inline mr-1" />
              Horário Final
            </label>
            <input
              {...register("endHour", { required: "Horário final é obrigatório" })}
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
            />
            {errors.endHour && <p className="text-red-500 text-sm">{errors.endHour.message}</p>}
          </div>
        </div>

        {/* Local e Instrutor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Local
            </label>
            <input
              {...register("location")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
              placeholder="Ex: Sala 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              👨‍🏫 Instrutor
            </label>
            <input
              {...register("instructor")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
              placeholder="Ex: Prof. Ana Paula"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#E31969] text-white rounded-lg hover:bg-[#c01456] transition-colors cursor-pointer"
          >
            {activity ? "Salvar Alterações" : "Criar Atividade"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
