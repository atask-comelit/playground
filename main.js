window.onload = function() {
  
  // Content for the pages.
  var pages = {
    a: {
      title: "Page A",
      content: "This is Page A."
    },
    b: {
      title: "Page B",
      content: "Arrived in Page B."
    },
    c: {
      title: "Page C",
      content: "Landed on page C."
    },
    d: {
      title: "Page D",
      content: "Navigated on page D."
    }
  }

  // Get references to the page elements.
  var navLinks = document.querySelectorAll('.load-content')
  var titleElement = document.getElementById('title')
  var contentElement = document.getElementById('content')

  // Update the page content.
  var updateContent = function(page, stateObj) {
    // Check to make sure that this state object is not null.
    if (stateObj) {
      document.title = stateObj.title
      titleElement.innerHTML = stateObj.title
      contentElement.innerHTML = stateObj.content

      ga('set', 'page', '/' + page)
      ga('send', 'pageview')
    }
  }

  // Attach click listeners for each of the nav links.
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
      e.preventDefault()

      // Fetch the page data using the URL in the link.
      var pageURL = this.attributes['href'].value
      var pageData = pages[pageURL.split('.')[0]]

      // Update the title and content.
      updateContent(pageURL, pageData)
      
      // Create a new history item.
      history.pushState(pageData, pageData.title, pageURL)
    })
  }
  
  // Update the page content when the popstate event is called.
  window.addEventListener('popstate', function(event) {
    updateContent(event.state)
  })

  // Load initial content.
  updateContent('a.html', pages.a)

  // Update this history event so that the state object contains the data
  // for page A.
  history.replaceState(pages.a, pages.a.title, 'a.html')
};