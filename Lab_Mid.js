

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const companyInput = document.getElementById('company');
  const attendanceField = document.getElementById('attendanceField');
  const analyticsToggle = document.getElementById('analyticsToggle');
  const analyticsPanel = document.getElementById('analyticsPanel');
  const totalCount = document.getElementById('totalCount');
  const virtualCount = document.getElementById('virtualCount');
  const inpersonCount = document.getElementById('inpersonCount');
  const formMessage = document.getElementById('formMessage');

 
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const companyError = document.getElementById('companyError');
  const attendanceError = document.getElementById('attendanceError');

  const registrants = [];

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
  nameInput.addEventListener('input', () => {
    const v = nameInput.value.trim();
    if (v.length === 0) {
      nameError.textContent = 'Name must be between 6 and 100 characters.';
      return;
    }
    if (v.length < 6 || v.length > 100) {
      nameError.textContent = 'Name must be between 6 and 100 characters.';
    } else {
      nameError.textContent = '';
    }
  });

  emailInput.addEventListener('input', () => {
    const v = emailInput.value.trim();
    if (!emailRegex.test(v)) {
      emailError.textContent = 'Please enter a valid professional email address.';
    } else {
      emailError.textContent = '';
    }
  });

  companyInput.addEventListener('input', () => {
    const v = companyInput.value.trim();
    if (v.length > 100) {
      companyError.textContent = 'Company/Institution name can be at most 100 characters.';
    } else {
      companyError.textContent = '';
    }
  });


  analyticsToggle.addEventListener('click', () => {
    const hidden = analyticsPanel.classList.toggle('hidden');
    analyticsPanel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    analyticsToggle.textContent = hidden ? 'Show Event Analytics' : 'Hide Event Analytics';
    
    updateAnalyticsDisplay();
  });

  function updateAnalyticsDisplay(){
    const total = registrants.length;
    const virtual = registrants.filter(r => r.attendance === 'Virtual').length;
    const inperson = registrants.filter(r => r.attendance === 'In-Person').length;

    totalCount.textContent = total;
    virtualCount.textContent = virtual;
    inpersonCount.textContent = inperson;
  }

  function getSelectedAttendance(){
    const radios = attendanceField.querySelectorAll('input[name="attendance"]');
    for (const r of radios){
      if (r.checked) return r.value;
    }
    return null;
  }


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.textContent = '';
    let valid = true;

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const companyVal = companyInput.value.trim();
    const attendanceVal = getSelectedAttendance();

    if (nameVal.length < 6 || nameVal.length > 100) {
      nameError.textContent = 'Name must be between 6 and 100 characters.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

   
    if (!emailRegex.test(emailVal)) {
      emailError.textContent = 'Please enter a valid professional email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

  
    if (companyVal.length > 100) {
      companyError.textContent = 'Company/Institution name can be at most 100 characters.';
      valid = false;
    } else {
      companyError.textContent = '';
    }

   
    if (!attendanceVal) {
      attendanceError.textContent = 'Please select your attendance type.';
      valid = false;
    } else {
      attendanceError.textContent = '';
    }

    if (!valid) {
      formMessage.textContent = '';
      return;
    }

  
    const registrant = {
      name: nameVal,
      email: emailVal,
      company: companyVal,
      attendance: attendanceVal,
      createdAt: new Date().toISOString()
    };

    registrants.push(registrant);

    
    formMessage.textContent = 'Registration successful — thank you!';
    formMessage.style.color = 'green';

    
    form.reset();

    
    updateAnalyticsDisplay();
  });
});
