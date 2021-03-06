<!doctype html>
<html>
    <title>Weather API</title>
    <head>
        <!-- <script src="//code.jquery.com/jquery.min.js"></script> -->
        <script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
    <!-- <script src="weather.js"></script> -->
    </head>

    <div id="nav-placeholder">
        <script>
            $.get("../base/navigation.html", function(data){
                $("#nav-placeholder").replaceWith(data);
            });
        </script>
    </div>

    <body id="body-text">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2>Weather R Us</h2>
            </div>
            <div class="panel-body">
                <div id="list-section">
                    <h3>Select your zip:</h3>

                    <?php

                        $selected_weather = null;

                        $weather_list = file_get_contents('http://weatherapiactivity.herokuapp.com/RESTAPI-Weather.php?action=get_weather_list');
                        $weather_list = json_decode($weather_list, true);

                        $secret_key = file_get_contents("http://weatherapiactivity.herokuapp.com/RESTAPI-Weather.php?action=get_secret_key");
                        $secret_key = json_decode($secret_key, true);

                        function getWeather($zip) {
                            $selected = file_get_contents("http://weatherapiactivity.herokuapp.com/RESTAPI-Weather.php?action=get_weather&zip=" . $zip);
                            $selected_json = json_decode($selected, true );
                            return $selected_json;
                        }

                        if (isset( $_GET["zip"])) {
                            $selected_weather = getWeather($_GET["zip"]);
                        }

                    ?>

                    <ul id="ziplist">
                        <?php foreach ($weather_list as $weather): ?>
                        <li>
                            <a href=<?php echo "weatherAPIhome.php?zip=" . $weather["zip"] ?> >
                                <?php echo $weather["name"]; echo " - "; echo $weather["zip"]; ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>

                    <form action="weatherAPIhome.php" method="get">
                        Enter your zip: <input type="text" name="zip"><br>
                        <input type="submit">
                    </form>
                </div>

                <div id="forecast-section">
                    <h3>Your local forecast</h3>

                    <p>
                        <strong>Name:</strong>
                        <?php
                            if( is_null($selected_weather)){
                                echo "NULL";
                            } elseif( $selected_weather == "Missing argument" ){
                                echo "Query is missing arguments";
                            } else {
                                echo $selected_weather["name"];
                            }
                        ?>
                        <span id="name"></span>
                    </p>
                    <p>
                        <strong>Forecast:</strong>
                        <?php
                        if( is_null($selected_weather)){
                            echo "NULL";
                        } elseif( $selected_weather == "Missing argument" ){
                            echo "Query is missing arguments";
                        } else {
                            echo $selected_weather["forecast"];
                        }
                        ?>
                        <span id="forecast"></span>
                    </p>
                    <img id="forecast-image" src="<?php echo $selected_weather["image"] ?>"/>
                </div>
            </div>
        </div>
    </body>

    <hr>

    <div id="footer-placeholder">
        <script>
            $.get("../base/footer.html", function(data){
                $("#footer-placeholder").replaceWith(data);
            });
        </script>
    </div>
</html>