import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AssetButton, columns } from '../../utils/AssetHelpers'
import DataTable from 'react-data-table-component'


const List = () => {
  const [assets, setAssets] = useState([])
  const [aseLoading, setAseLoading] = useState(false)
  const [filteredAssets, setFilteredAssets] = useState([])


  useEffect(() => {
    const fetchAssets = async () => {
      setAseLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/asset', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
          
        })
        console.log(response.data.assets);
        
        if (response.data.success) {
          let sno = 1
          const data = await response.data.assets.map((ase) => (
            {
              _id: ase._id,
              sno: sno++,
              assetId: ase.assetId,
              modelNo: ase.modelNo,
              assetType: ase.assetType,
              location: ase.location,
              department_name: ase.department?.department_name || "N/A",
              profileImage: < img width={40} className='rounded-full' src={`http://localhost:3000/${ase.profileImage || 'default.jpg'}`} />,
              action: (<AssetButton Id={ase._id}/>)
            }
          ))
          setAssets(data)
          setFilteredAssets(data)
        }
      }
      catch(error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally{
        setAseLoading(false)
      }
    }
    fetchAssets()
  }, [])


  const handleFilter = (e) => {
    const records = assets.filter((asset) =>
      asset.assetId.toLowerCase().includes(e.target.value.toLowerCase()) ||
      asset.modelNo.toLowerCase().includes(e.target.value.toLowerCase())
    )
    
    setFilteredAssets(records)
  }

  return (
    <>{aseLoading ? <div>Loading...</div> :
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Assets</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input className='px-4 py-0.5 border' 
        type="text" 
        placeholder='Search By Asset'
        onChange={handleFilter} 
        />
        <Link className='px-4 py-1 bg-teal-600 rounded text-white' to="/admin-dashboard/assets/add-asset">Add New Asset</Link>
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={filteredAssets} pagination/>
      </div>
    </div>
    }</>
  )
}

export default List
