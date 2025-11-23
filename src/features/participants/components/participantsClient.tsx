'use client'
import React, { useState } from 'react'
import { Search, Filter, Edit, Trash2, GraduationCap, UserCheck, Clock } from 'lucide-react'
import { Participants } from '../types/participants'
import { EditParticipantModal } from './editParticipantModal'
import { DeleteParticipantModal } from './deleteParticipantModal'
import { convertYearToText } from '@/shared/utils/convertYearToText'
import { updateParticipant } from '../actions/editParticipants'
import { toast } from 'react-toastify'
import { getParticipants } from '../actions/getParticipants'
import { deleteParticipant } from '../actions/deleteParticipant'

export default function ParticipantsClient({ participants }: { participants: Participants[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<Participants | null>(null)
  const [studentToDelete, setStudentToDelete] = useState<{ id: string; name: string } | null>(null)

  const statuses = [
    { value: 'all', label: 'Todos os status' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ]

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.escola.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && participant.isActive === true) ||
      (selectedStatus === 'inactive' && participant.isActive === false)

    return matchesSearch && matchesStatus
  })

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleEditParticipant = (participant: Participants) => {
    setSelectedParticipant(participant)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (participantId: string, participantNome: string) => {
    setStudentToDelete({ id: participantId, name: participantNome })
    setIsDeleteModalOpen(true)
  }

  const handleUpdateParticipant = async (participantId: string, participantData: any) => {
    const result = await updateParticipant(participantId, participantData)

    if (!result.success) {
      toast.error('Erro ao atualizar participante')
      return
    }

    toast.success('Participante atualizado com sucesso!')
    await getParticipants();
  }

  const handleDeleteParticipant = async (participantId: string) => {
    const res = await deleteParticipant(participantId)

    if (!res.success) {
      toast.error(res.message)
      return
    }

    // Atualiza lista
    const updatedParticipants = await getParticipants()
    // setUserList(updatedParticipants)

    toast.success(res.message)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Gerenciamento de Participantes
            </h1>
            <p className="text-lg text-gray-600">Gerencie os participantes cadastrados na OSC</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Buscar participantes por nome ou escola..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
              aria-label="Buscar participantes"
            />
          </div>

          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
              aria-label="Filtrar por status"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#E31969]">
              <GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Participantes</p>
              <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#61CE70]">
              <UserCheck className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Participantes Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {participants.filter((p) => p.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escola
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cadastrado em
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#61CE70] flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {getInitials(participant.nomeCompleto)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">
                          {participant.nomeCompleto}
                        </div>
                        <div className="text-sm text-gray-500">
                          {participant.idade} anos • {convertYearToText(participant.serie)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900">{participant.escola}</div>
                    <div className="text-sm text-gray-500">Turno: {participant.turno}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900">{participant.responsavel.nomeCompleto}</div>
                    <div className="text-sm text-gray-500">{participant.responsavel.telefone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${participant.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {participant.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                      {new Date(participant.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditParticipant(participant)}
                        className="p-2 text-[#61CE70] hover:bg-[#61CE70] hover:text-white rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#61CE70] focus:ring-offset-2"
                        aria-label={`Editar ${participant.nomeCompleto}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(participant.id, participant.nomeCompleto)}
                        className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                        aria-label={`Excluir ${participant.nomeCompleto}`}
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

        {filteredParticipants.length === 0 && (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum participante encontrado</h3>
            <p className="text-base text-gray-600">
              Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
          </div>
        )}
      </div>

      {/* Modais */}
      <EditParticipantModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedParticipant(null)
        }}
        onSave={handleUpdateParticipant}
        participants={selectedParticipant}
      />

      <DeleteParticipantModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setStudentToDelete(null)
        }}
        onConfirm={handleDeleteParticipant}
        participantName={studentToDelete?.name || ''}
        participantId={studentToDelete?.id || null}
      />
    </div>
  )
}
