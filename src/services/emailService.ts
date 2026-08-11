const WEB3FORMS_ACCESS_KEY = '5520a86f-622c-448c-9837-599df1ac0d62';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const initEmailJS = () => {};

const submitToWeb3Forms = async (formType: string, data: Record<string, unknown>, captchaToken?: string) => {
  const form = new FormData();
  form.append('access_key', WEB3FORMS_ACCESS_KEY);
  form.append('subject', `${formType} Submission - GBN NPC`);
  form.append('from_name', String(data.fullName || data.name || data.donorName || data.contactPerson || 'Anonymous'));
  form.append('from_email', String(data.email || ''));
  form.append('message', formatFormData(formType, data));

  if (captchaToken) {
    form.append('h-captcha-response', captchaToken);
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'message' || value === undefined || value === null) return;
    form.append(key, String(value));
  });

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: form
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Email submission failed');
  }
};

export const sendFormNotification = async (formType: string, formData: Record<string, unknown>, captchaToken?: string) => {
  try {
    await submitToWeb3Forms(formType, formData, captchaToken);
    console.log(`Email notification sent for ${formType}`);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
};

const formatFormData = (formType: string, data: Record<string, unknown>): string => {
  const lines: string[] = [];

  switch (formType) {
    case 'Volunteer':
      lines.push(`Name: ${data.fullName || 'N/A'}`);
      lines.push(`Email: ${data.email || 'N/A'}`);
      lines.push(`Phone: ${data.phone || 'N/A'}`);
      lines.push(`Skills: ${data.skills || 'N/A'}`);
      lines.push(`Availability: ${data.availability || 'N/A'}`);
      if (data.message) lines.push(`Message: ${data.message}`);
      break;
    case 'Donation':
      lines.push(`Name: ${data.donorName || 'N/A'}`);
      lines.push(`Email: ${data.email || 'N/A'}`);
      lines.push(`Amount: ${data.amount || 'N/A'} ${data.currency || 'ZAR'}`);
      if (data.message) lines.push(`Message: ${data.message}`);
      break;
    case 'Partnership':
      lines.push(`Organization: ${data.organizationName || 'N/A'}`);
      lines.push(`Contact: ${data.contactPerson || 'N/A'}`);
      lines.push(`Email: ${data.email || 'N/A'}`);
      lines.push(`Phone: ${data.phone || 'N/A'}`);
      lines.push(`Type: ${data.partnershipType || 'N/A'}`);
      if (data.message) lines.push(`Message: ${data.message}`);
      break;
    case 'Contact':
      lines.push(`Name: ${data.name || 'N/A'}`);
      lines.push(`Email: ${data.email || 'N/A'}`);
      if (data.subject) lines.push(`Subject: ${data.subject}`);
      if (data.message) lines.push(`Message: ${data.message}`);
      break;
    case 'Photo Submission':
      lines.push(`Name: ${data.name || 'N/A'}`);
      lines.push(`Email: ${data.email || 'N/A'}`);
      if (data.title) lines.push(`Title: ${data.title}`);
      if (data.message) lines.push(`Message: ${data.message}`);
      break;
    default:
      lines.push(`Data: ${JSON.stringify(data, null, 2)}`);
  }

  return lines.join('\n');
};

export const notifyAdmin = async (type: string, data: any, captchaToken?: string) => {
  try {
    await submitToWeb3Forms(type, data, captchaToken);
    console.log(`Email notification sent for ${type}`);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
};
