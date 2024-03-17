<?php
    // Connect to database
    $conn = mysqli_connect("localhost", "username", "password", "database");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Check form input
    if (isset($_POST['name']) and isset($_POST['description'])) {
        $name = $_POST['name'];
        $description = $_POST['description'];

        // Add medicine to database
        $sql = "INSERT INTO medicines (name, description) VALUES ('$name', '$description')";
        if (mysqli_query($conn, $sql)) {
            echo "<div class='success'>Medicine added successfully!</div>";
        } else {
            echo "<div class='error'>Error adding medicine: " . mysqli_error($conn) . "</div>";
        }
    }
?> // Connect to database
$conn = mysqli_connect("localhost", "username", "password", "database");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get medicines from database
$sql = "SELECT name, description FROM medicines WHERE name LIKE '%$searchQuery%'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        echo "<div class=\"medicine-list li\">";
        echo "<span class=\"name\">" . $row['name'] . "</span>";
        echo "<p class=\"description\">" . $row['description'] . "</p>";
        echo "</div>";
    }
} else {
    echo "<div class=\"error\">No medicines found in database</div>";
}
?>