function setActiveDot(element) {
  document.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"))
  element.classList.add("active")
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Add button interactivity
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    console.log("[v0] Button clicked:", this.textContent.trim())
  })
})
