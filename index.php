<!DOCTYPE html>
<?php
require_once __DIR__ . './src/request.php';
$user = new Users();
if (!isset($_SESSION['user'])) {
    header("Location: ./login.php");
}
$user = $user->fetch(["id" => $_SESSION['user']]);
?>
<html lang="en">

    <html>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CGPA Calculator</title>
        <?php require_once('./base/style.php') ?>
        <link rel="stylesheet" href="./assets/styles/css/index.css">
        </head>

        <body>

            <aside>
                <div class="head">
                    <img src="./assets/images/logo.png" alt="company logo">
                    <h6>CGPA Calculator</h6>
                </div>
                <div class="side-links">
                    <ul class="top-link">
                        <li id="dashboard_link">
                            <button type="button" class="link" data-page="dashboard">
                                <i class="fa fa-pie-chart link-icon" aria-hidden="true"></i>
                                <span>Dashboard</span>
                            </button>
                        </li>

                        <li id="calculate_link">
                            <button type="button" class="link" data-page="calculate">
                                <i class="fas fa-calculator link-icon" aria-hidden="true"></i>
                                <span>Calculate GPA</span>
                            </button>
                        </li>

                        <li id="details_link">
                            <button type="button" class="link" data-page="details">
                                <i class="fas fa-table-cells link-icon" aria-hidden="true"></i>
                                <span>View Details</span>
                            </button>
                        </li>

                    </ul>

                    <ul class="other-link">
                        <li id="settings_link">
                            <button type="button" class="link" data-page="settings">
                                <i class="fas fa-wrench link-icon" aria-hidden="true"></i>
                                <span>Settings</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="link text-danger myModalToggler" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt link-icon" aria-hidden="true"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                        <footer>
                            <p> Developed by Abdul-Azeem <a href="#"> <i class="fab fa-whatsapp" aria-hidden="true"></i> </a></p>
                        </footer>
                    </ul>

                </div>
            </aside>
            <main>

                <header>
                    <div class="right">
                        <span id="sidebar-toggler">
                            <i class="fas fa-bars"></i>
                        </span>
                        <h5 class="title"></h5>
                    </div>
                    <div class="user">
                        <img src="./assets/images/<?= $user['image'] ?>" alt="your image">
                        <span> <i class="fas fa-angle-down" aria-hidden="true"></i> </span>
                    </div>
                    <ul class="dropdown">
                        <li>
                            <div class="litle-info">
                                <img src="./assets/images/<?= $user['image'] ?>" alt="my image">
                                <div class="info">
                                    <h5><?= $user['firstname'] ?></h5>
                                    <h6>Student</h6>
                                    <button type="button" class="btn btn-danger myModalToggler btn-sm" data-target="#logoutModal">
                                        <i class="fas fa-sign-out-alt link-icon" aria-hidden="true"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button type="button" class="link" data-page="settings">
                                <i class="fas fa-wrench link-icon" aria-hidden="true"></i>
                                <span>Settings</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="link text-danger myModalToggler" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt link-icon" aria-hidden="true"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </header>

                <section id="main">
                    <div class="overlay">
                        <img src="./assets/images/spinner.gif" alt="overlay">
                    </div>

                </section>
            </main>


            <div class="myModal" id="logoutModal">
                <div class="modalContent">
                    <span class="close-popup" data-dismiss="myModal"><i class="fas fa-xmark"></i></span>
                    <div class="body">
                        <span class="text-danger"><i class="fas fa-triangle-exclamation"></i></span>
                        <h6> You are about to logout </h6>
                    </div>
                    <div class="footer">
                        <button href="./login.php" type="button" id="logout" class="btn btn-danger">Logout</button>
                        <button type="button" class="close-popup btn btn-secondary" data-dismiss="myModal">Cancel</button>
                    </div>
                </div>
            </div>


            <?php require_once('./base/script.php') ?>
            <script src="./assets/scripts/index.js" type="module"></script>
        </body>

    </html>