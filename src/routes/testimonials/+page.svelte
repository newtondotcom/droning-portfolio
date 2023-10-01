<script lang="ts">

</script>

<div class="container">
    <div id="content">
        <div class="testimonial">
        <blockquote>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </blockquote>
        <div></div>
        <p>
        John Doe &mdash; Worcestershire, UK
        </p>
        </div>
    </div>
    <div id="content">
        <div class="testimonial">
        <blockquote>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </blockquote>
        <div></div>
        <p>
        John Doe &mdash; Worcestershire, UK
        </p>
        </div>
    </div>
    <div id="content">
        <div class="testimonial">
        <blockquote>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </blockquote>
        <div></div>
        <p>
        John Doe &mdash; Worcestershire, UK
        </p>
        </div>
    </div>
</div>

<style>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}

#content {
  max-width: 600px;
  height: 10vh;
  max-height: 30vh;
  margin: 20vh auto;
}

.testimonial blockquote {
  margin: 10px 10px 0;
  background: #efefef;
  padding: 20px 60px;
  position: relative;
  border: none;
  border-radius: 8px;
  font-style: italic;
}

.testimonial blockquote:before,
.testimonial blockquote:after {
  content: "\201C";
  position: absolute;
  font-size: 80px;
  line-height: 1;
  color: #757f9a;
  font-style: normal;
}

.testimonial blockquote:before {
  top: 0;
  left: 10px;
}

.testimonial blockquote:after {
  content: "\201D";
  right: 10px;
  bottom: -0.5em;
}

.testimonial div {
  width: 0;
  height: 0;
  border-left: 0 solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #efefef;
  margin: 0 0 0 60px;
}

.testimonial p {
  margin: 8px 0 0 20px;
  text-align: left;
  color: #fff;
}

@media only screen and (max-width: 768px) {
  #content {
    margin: 25vh auto;
  }

  .container {
    flex-direction: column;
    margin-top: 100px;
  }
}

</style>