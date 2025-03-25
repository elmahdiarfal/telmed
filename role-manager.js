// Role manager for telemedicine platform
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const userRoleElement = document.getElementById('user-role');
    const localLabelElement = document.getElementById('local-label');
    const remoteLabelElement = document.getElementById('remote-label');
    const callButton = document.getElementById('call');
    const waitingIndicator = document.getElementById('waiting');
    
    // Default state - role not determined yet
    let isDoctor = null;
    
    // Set initial labels
    updateLabels('Connecting...');
    
    // Listen for call button click - this indicates the user is a doctor
    callButton.addEventListener('click', function() {
        setAsDoctor();
    });
    
    // Function to set this device as doctor (call initiator)
    function setAsDoctor() {
        isDoctor = true;
        updateLabels('Doctor');
        
        // Update waiting message
        waitingIndicator.textContent = 'Waiting for patient to answer...';
    }
    
    // Function to set this device as patient (call receiver)
    function setAsPatient() {
        isDoctor = false;
        updateLabels('Patient');
    }
    
    // Update the UI based on role
    function updateLabels(role) {
        // Update role indicator
        userRoleElement.textContent = role;
        
        if (role === 'Doctor') {
            // If doctor, local is doctor and remote is patient
            localLabelElement.textContent = 'Doctor';
            remoteLabelElement.textContent = 'Patient';
            
            localLabelElement.classList.add('doctor-label');
            remoteLabelElement.classList.add('patient-label');
            
            localLabelElement.classList.remove('patient-label');
            remoteLabelElement.classList.remove('doctor-label');
        } 
        else if (role === 'Patient') {
            // If patient, local is patient and remote is doctor
            localLabelElement.textContent = 'Patient';
            remoteLabelElement.textContent = 'Doctor';
            
            localLabelElement.classList.add('patient-label');
            remoteLabelElement.classList.add('doctor-label');
            
            localLabelElement.classList.remove('doctor-label');
            remoteLabelElement.classList.remove('patient-label');
        }
    }
    
    // Expose these functions to be called from other scripts
    window.roleManager = {
        setAsDoctor,
        setAsPatient
    };
});