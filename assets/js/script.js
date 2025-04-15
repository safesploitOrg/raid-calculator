function calculateRAID() {
    const raidType = document.getElementById("raidType").value;
    const driveCount = parseInt(document.getElementById("driveCount").value);
    const driveSize = parseFloat(document.getElementById("driveSize").value);
  
    let usable = 0, parity = 0, redundancy = "";
  
    switch(raidType) {
      case "0":
        usable = driveCount * driveSize;
        parity = 0;
        redundancy = "None";
        break;
      case "1":
        usable = driveCount * driveSize / 2;
        parity = usable;
        redundancy = "1 drive fault tolerance";
        break;
      case "5":
        if (driveCount < 3) return showError("RAID 5 requires at least 3 drives");
        usable = (driveCount - 1) * driveSize;
        parity = driveSize;
        redundancy = "1 drive fault tolerance";
        break;
      case "6":
        if (driveCount < 4) return showError("RAID 6 requires at least 4 drives");
        usable = (driveCount - 2) * driveSize;
        parity = 2 * driveSize;
        redundancy = "2 drive fault tolerance";
        break;
      case "10":
        if (driveCount % 2 !== 0) return showError("RAID 10 requires an even number of drives");
        usable = (driveCount / 2) * driveSize;
        parity = usable;
        redundancy = "1 drive per mirrored pair fault tolerance";
        break;
      default:
        return showError("This RAID type is not supported in the calculator yet.");
    }
  
    document.getElementById("result").innerHTML = `
      <strong>Usable Capacity:</strong> ${usable} TB<br>
      <strong>Parity Overhead:</strong> ${parity} TB<br>
      <strong>Redundancy:</strong> ${redundancy}
    `;
  }
  
  function showError(message) {
    document.getElementById("result").innerHTML = `<span style="color:red;">${message}</span>`;
  }

  function setFooterYear() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
  }
  
  function switchTab(tabId) {
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  
    document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add("active");
    document.getElementById(tabId).classList.add("active");
  }
  
  function main() {
    setFooterYear();
  }
  
  // --- Run ---
  main();