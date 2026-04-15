export function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `admin-toast admin-toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { 
    t.classList.remove('show'); 
    setTimeout(() => t.remove(), 400); 
  }, 3000);
}

export function compressImageToWebp(file, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve(file);
      return;
    }
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(file);
          return;
        }
        const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
        const newFile = new File([blob], newName, {
          type: "image/webp",
          lastModified: Date.now(),
        });
        resolve(newFile);
      }, 'image/webp', quality);
    };
    img.onerror = (err) => resolve(file); // fallback to original file if parsing fails
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Log an admin action to the admin_logs table.
 * @param {object} supabase - Supabase client instance
 * @param {string} adminId  - UUID of the acting admin
 * @param {string} adminName - Display name of the acting admin
 * @param {string} actionType - e.g. "CREATE", "UPDATE", "DELETE"
 * @param {string} entity - The thing being acted on, e.g. "Player", "News"
 * @param {string} details - Human-readable description, e.g. "Added player John Doe"
 */
export async function logAdminAction(supabase, adminId, adminName, actionType, entity, details) {
  try {
    await supabase.from('admin_logs').insert({
      admin_id: adminId,
      admin_name: adminName,
      action_type: actionType,
      entity,
      details,
    });
  } catch (e) {
    // Logging failures should never block main operations
    console.warn('[AuditLog] Failed to write log:', e);
  }
}
