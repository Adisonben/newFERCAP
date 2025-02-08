import React from 'react'

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex border-b border-gray-100 py-2 text-sm">
        <span className="w-1/3 text-gray-500">{label}</span>
        <span className="w-2/3 text-gray-900">{value || "-"}</span>
    </div>
  )
}

export default InfoRow
