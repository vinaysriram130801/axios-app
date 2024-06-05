import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function CrudEmp1() {
 
    // Declarations
    const [branches, setBranches] = useState([]);
    const [branch_name, setName] = useState('');
    const [branch_location, setLocation] = useState('');
    const [branch_contact, setContact] = useState('');
    const [editingBranch, setEditingBranch] = useState(null);
    const [errors, setErrors] = useState({});
 
    // Fetching Data using axios(GET)
    useEffect(() => {
        axios.get('http://localhost:1158/branchservice/Bgetall')
          .then(response => {
            setBranches(response.data.branchList);
          })
          .catch(error => {
            console.error('There was an error fetching the branches!', error);
          });
      }, []);
 
    const validateForm = () => {
        const errors = {};
        let isValid = true;
 
        if (!branch_name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }
 
        if (!branch_location.trim()) {
            errors.location = "Location is required";
            isValid = false;
        }
 
        if (!branch_contact.trim()) {
            errors.contact = "Contact is required";
            isValid = false;
        } else if (!/^\d+$/.test(branch_contact)) {
            errors.contact = "Contact must be a number";
            isValid = false;
        }
 
        setErrors(errors);
        return isValid;
    };
 
    // Adding a Branch(POST)
    const createBranch = () => {
        if (!validateForm()) return;
 
        axios.post('http://localhost:1158/branchservice/Badd', {
            branch_name,
            branch_location,
            branch_contact
        })
        .then(response => {
            setBranches([...branches, response.data.branchList]);
            setName('');
            setLocation('');
            setContact('');
        })
        .catch(error => {
            console.error('There was an error creating the branch!', error);
        });
    };
 
    // Updating a Branch(PUT)
    const updateBranch = (branch) => {
        if (!validateForm()) return;
 
        axios.put(`http://localhost:1158/branchservice/Bupdate/${branch.branch_id}`, branch)
        .then(response => {
            setBranches(branches.map(b => (b.branch_id === branch.branch_id ? response.data.branchList : b)));
            setEditingBranch(null);
            setName('');
            setLocation('');
            setContact('');
        })
        .catch(error => {
            console.error('There was an error updating the branch!', error);
        });
    };
 
    // Deleting a Branch(DELETE)
    const deleteBranch = (id) => {
        axios.delete(`http://localhost:1158/branchservice/Bdelete/${id}`)
        .then(() => {
            setBranches(branches.filter(branch => branch.branch_id !== id));
        })
        .catch(error => {
            console.error('There was an error deleting the branch!', error);
        });
    };
 
 
    const handleEditClick = (branch) => {
        setEditingBranch(branch);
        setName(branch.branch_name);
        setLocation(branch.branch_location);
        setContact(branch.branch_contact);
       
    };
   
    const handleSaveClick = () => {
        if (editingBranch) {
            updateBranch({ ...editingBranch, branch_name, branch_location, branch_contact });
        } else {
            createBranch();
        }
    };
 
    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <h1>CRUD using Axios</h1>
              <div className="mb-3 mt-5">
                <input
                  type="text"
                  className={`form-control border border-secondary ${errors.name && 'is-invalid'}`}
                  style={{ maxWidth: '400px' }}
                  placeholder="Name"
                  value={branch_name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control border border-secondary ${errors.location && 'is-invalid'}`}
                  style={{ maxWidth: '400px' }}
                  placeholder="Location"
                  value={branch_location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control border border-secondary ${errors.contact && 'is-invalid'}`}
                  style={{ maxWidth: '400px' }}
                  placeholder="Contact"
                  value={branch_contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
              </div>
              <div>
                <button className="btn btn-warning" onClick={handleSaveClick}>
                  {editingBranch ? 'Update Branch' : 'Create Branch'}
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <h2>Branch List</h2>
              <ul className="list-group border border-secondary">
                {branches.map(branch => (
                    branch && (
                  <li key={branch.branch_id} className="list-group-item">
                    <div>
                      <h5>Branch Name: {branch.branch_name}</h5>
                      <p>Branch Id: {branch.branch_id}</p>
                      <p>Branch Location: {branch.branch_location}</p>
                      <p>Branch Contact: {branch.branch_contact}</p>
                      <button className="btn btn-warning me-2" onClick={() => handleEditClick(branch)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteBranch(branch.branch_id)}>Delete</button>
                    </div>
                  </li> )
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
}
 
export default CrudEmp1;